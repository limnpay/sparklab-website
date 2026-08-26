"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders blog body markdown using react-markdown. Client component because
 * ReactMarkdown is a client lib; that's fine — the body is just text, and
 * the page itself is statically generated.
 */
export function MarkdownBody({ children }: { children: string }) {
  return (
    <div
      className="
      [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[color:var(--color-fg)] [&_h2]:scroll-mt-24
      [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[color:var(--color-fg)]
      [&_p]:my-5 [&_p]:text-lg [&_p]:text-[color:var(--color-fg-muted)] [&_p]:leading-relaxed
      [&_strong]:text-[color:var(--color-fg)] [&_strong]:font-semibold
      [&_em]:italic
      [&_a]:text-[color:var(--color-spark)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-[color:var(--color-spark)]/40 hover:[&_a]:text-[color:var(--color-spark-strong)] hover:[&_a]:decoration-[color:var(--color-spark-strong)]
      [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:my-2 [&_ul_li]:text-lg [&_ul_li]:text-[color:var(--color-fg-muted)] [&_ul_li]:leading-relaxed
      [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol_li]:my-2 [&_ol_li]:text-lg [&_ol_li]:text-[color:var(--color-fg-muted)]
      [&_blockquote]:my-7 [&_blockquote]:border-l-4 [&_blockquote]:border-[color:var(--color-electric)] [&_blockquote]:pl-5 [&_blockquote]:italic
      [&_code]:rounded [&_code]:bg-[color:var(--color-bg-elevated)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono
      [&_hr]:my-12 [&_hr]:border-[color:var(--color-border)]
    "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
