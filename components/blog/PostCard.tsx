import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-2xl bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] transition-all hover:border-[color:var(--color-spark)]/40 flex flex-col">
      {post.image ? (
        <Link
          href={`/blog/${post.slug}`}
          className="relative aspect-[16/9] overflow-hidden"
          aria-hidden="true"
          tabIndex={-1}
        >
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      ) : null}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-[color:var(--color-fg-muted)]">
          <time dateTime={post.date}>
            {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden />
            {post.readingTimeMinutes} min read
          </span>
        </div>
        <h2 className="mt-3 text-xl font-bold">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-[color:var(--color-spark)] transition-colors after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-[color:var(--color-fg-muted)] flex-1">
          {post.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-spark)] group-hover:gap-2 transition-all">
          Read more
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}
