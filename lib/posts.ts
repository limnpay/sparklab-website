import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Blog posts are markdown files in /content/blog. Each file's frontmatter
 * powers the title/description/date/etc., and the body is rendered as Markdown.
 *
 * To add a new post: drop a new `.md` file in /content/blog with the
 * frontmatter shape below. It's automatically:
 *   • added to /blog
 *   • given its own route at /blog/[slug]
 *   • included in /sitemap.xml
 *   • included in /blog/rss.xml
 *   • emitted with Article + BreadcrumbList JSON-LD
 */

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  /** Optional hero image path under /public, e.g. "/images/heroes/program.jpg" */
  image?: string;
  /** Tags used for filtering + schema keywords */
  tags?: string[];
  /** Set true to hide from index (post still routable by slug) */
  draft?: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  body: string;
  readingTimeMinutes: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  // ~200wpm reading speed; round up to the nearest minute.
  const words = content.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.round(words / 200));

  return {
    ...fm,
    slug,
    body: content,
    readingTimeMinutes,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map(readPostFile)
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Post | undefined {
  const filename = `${slug}.md`;
  const fullPath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(fullPath)) return undefined;
  return readPostFile(filename);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
