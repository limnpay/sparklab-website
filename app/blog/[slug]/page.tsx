import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { getAllPosts, getAllSlugs, getPost } from "@/lib/posts";
import { Section } from "@/components/ui/Section";
import { PostCard } from "@/components/blog/PostCard";
import { MarkdownBody } from "@/components/blog/MarkdownBody";
import { BreadcrumbsJsonLd, JsonLd } from "@/components/seo/JsonLd";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image,
    keywords: post.tags,
  });
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${SITE.url}/blog/${post.slug}#post`,
          headline: post.title,
          description: post.description,
          image: post.image
            ? `${SITE.url}${post.image}`
            : `${SITE.url}${SITE.defaultOgImage}`,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            "@type": "Organization",
            name: post.author,
            url: SITE.url,
          },
          publisher: { "@id": `${SITE.url}/#organization` },
          mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
          keywords: post.tags?.join(", "),
        }}
      />

      <article className="pt-8 sm:pt-12">
        <div className="container-prose">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-spark)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>

          <header className="mt-8 max-w-3xl">
            <p className="eyebrow">{post.author}</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {post.title}
            </h1>
            <p className="mt-6 text-xl text-[color:var(--color-fg-muted)]">
              {post.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-[color:var(--color-fg-muted)]">
              <time dateTime={post.date}>
                {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                {post.readingTimeMinutes} min read
              </span>
              {post.tags?.length ? (
                <>
                  <span aria-hidden>·</span>
                  <ul className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="inline-flex rounded-full bg-[color:var(--color-bg-card)] border border-[color:var(--color-border-strong)] px-2.5 py-0.5 text-xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </header>
        </div>

        {post.image ? (
          <div className="container-prose mt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        ) : null}

        <div className="container-prose">
          <div className="mx-auto max-w-3xl py-12 sm:py-16">
            <MarkdownBody>{post.body}</MarkdownBody>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <Section tone="card" ariaLabelledby="related-heading">
          <h2 id="related-heading" className="text-2xl sm:text-3xl font-bold">
            Keep reading
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
