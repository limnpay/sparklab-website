import Link from "next/link";
import { Rss } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { BreadcrumbsJsonLd, JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Blog — Notes on Youth Entrepreneurship Education",
  description:
    "Practical writing from SparkLab on entrepreneurship education, pitch competitions, and bringing real business experience into Michigan high schools.",
  path: "/blog",
  keywords: [
    "youth entrepreneurship blog",
    "high school business education",
    "Michigan entrepreneurship",
    "pitch competition advice",
    "SparkLab blog",
  ],
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE.url}/blog#blog`,
          url: `${SITE.url}/blog`,
          name: `${SITE.name} Blog`,
          description:
            "Notes from SparkLab on entrepreneurship education and pitch competitions in Michigan high schools.",
          publisher: { "@id": `${SITE.url}/#organization` },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            url: `${SITE.url}/blog/${p.slug}`,
            datePublished: p.date,
            author: { "@type": "Organization", name: p.author },
          })),
        }}
      />

      <PageHero
        eyebrow="The SparkLab Blog"
        title={
          <>
            Notes on{" "}
            <span className="text-gradient-spark">building.</span>
          </>
        }
        description="Practical writing on entrepreneurship education, pitch competitions, and what it looks like to build a real business in a Michigan high school classroom."
        imageSrc="/images/heroes/about.jpg"
      >
        <Link
          href="/blog/rss.xml"
          className="inline-flex items-center gap-2 text-sm text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-spark)] transition-colors"
        >
          <Rss className="h-4 w-4" />
          Subscribe via RSS
        </Link>
      </PageHero>

      <Section ariaLabelledby="posts-heading">
        <h2 id="posts-heading" className="sr-only">
          All posts
        </h2>
        {posts.length === 0 ? (
          <p className="text-center text-[color:var(--color-fg-muted)]">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
