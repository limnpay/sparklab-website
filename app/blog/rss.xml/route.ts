import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();
  const latest = posts[0]?.date;

  const items = posts
    .map((post) => {
      const url = `${SITE.url}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date + "T00:00:00").toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)} Blog</title>
    <link>${SITE.url}/blog</link>
    <description>${escapeXml(SITE.shortDescription)}</description>
    <language>en-us</language>
    ${latest ? `<lastBuildDate>${new Date(latest + "T00:00:00").toUTCString()}</lastBuildDate>` : ""}
    <atom:link href="${SITE.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
