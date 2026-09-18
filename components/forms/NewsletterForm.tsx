"use client";

import { useState, useTransition } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { FORMSPREE } from "@/lib/constants";

type Status = "idle" | "success" | "error";

export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const action =
    FORMSPREE.newsletterId &&
    `https://formspree.io/f/${FORMSPREE.newsletterId}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    if (!action) {
      setStatus("error");
      setMessage(
        "Newsletter is not configured yet (missing NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID)."
      );
      return;
    }
    startTransition(async () => {
      try {
        const res = await fetch(action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            source,
            _subject: `SparkLab newsletter signup (${source})`,
          }),
        });
        if (res.ok) {
          setStatus("success");
          setMessage(
            "You're in. We'll send program stories and ways to get involved straight to your inbox."
          );
          setEmail("");
        } else {
          setStatus("error");
          setMessage("Something went wrong. Please try again in a moment.");
        }
      } catch {
        setStatus("error");
        setMessage(
          "We couldn't reach the signup service. Please try again or email us."
        );
      }
    });
  }

  if (status === "success") {
    return (
      <p
        role="status"
        className="inline-flex items-center justify-center gap-2 text-[color:var(--color-electric)] font-medium"
      >
        <CheckCircle2 className="h-5 w-5" />
        {message}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      noValidate
    >
      <label htmlFor={`newsletter-email-${source}`} className="sr-only">
        Email address
      </label>
      <input
        id={`newsletter-email-${source}`}
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-invalid={status === "error"}
        aria-describedby={status === "error" ? `newsletter-error-${source}` : undefined}
        disabled={pending}
        className="flex-1 rounded-lg bg-[color:var(--color-bg)] border border-[color:var(--color-border-strong)] px-4 py-3 text-[color:var(--color-fg)] placeholder:text-[color:var(--color-fg-subtle)] focus:outline-none focus:border-[color:var(--color-spark)]"
      />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--color-spark)] px-5 py-3 text-white font-semibold hover:bg-[color:var(--color-spark-strong)] transition-colors disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Subscribing
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Subscribe
          </>
        )}
      </button>
      {status === "error" ? (
        <p
          id={`newsletter-error-${source}`}
          role="alert"
          className="sm:absolute sm:translate-y-12 text-sm text-red-400 sm:text-center"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
