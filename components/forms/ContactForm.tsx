"use client";

import { useState, useTransition } from "react";
import {
  Briefcase,
  CheckCircle2,
  Heart,
  Loader2,
  School,
  Send,
  Users,
  type LucideIcon,
} from "lucide-react";
import { FORMSPREE } from "@/lib/constants";
import { cn } from "@/lib/cn";

type InterestType = "student" | "school" | "mentor" | "sponsor";

const INTERESTS: Array<{
  id: InterestType;
  label: string;
  icon: LucideIcon;
  orgLabel: string;
  orgPlaceholder: string;
  messagePlaceholder: string;
}> = [
  {
    id: "student",
    label: "I'm a Student",
    icon: Users,
    orgLabel: "School (optional)",
    orgPlaceholder: "Your high school",
    messagePlaceholder:
      "Tell us about yourself, your school, and why you're excited about SparkLab.",
  },
  {
    id: "school",
    label: "I represent a School",
    icon: School,
    orgLabel: "School / District",
    orgPlaceholder: "e.g. Birmingham Seaholm High School",
    messagePlaceholder:
      "Tell us about your school and what you're hoping SparkLab can do for your students.",
  },
  {
    id: "mentor",
    label: "I want to Mentor or Judge",
    icon: Briefcase,
    orgLabel: "Company (optional)",
    orgPlaceholder: "Your employer",
    messagePlaceholder:
      "Tell us about your background and whether you'd like to mentor, judge, or both.",
  },
  {
    id: "sponsor",
    label: "I want to Sponsor",
    icon: Heart,
    orgLabel: "Company",
    orgPlaceholder: "Your company",
    messagePlaceholder:
      "Tell us about your company and what kind of sponsorship you're considering.",
  },
];

const INTEREST_IDS = ["student", "school", "mentor", "sponsor"] as const;

function isInterestType(value: string | undefined): value is InterestType {
  return INTEREST_IDS.includes(value as InterestType);
}

export function ContactForm({
  initialInterest = "student",
}: {
  initialInterest?: InterestType;
}) {
  const [interest, setInterest] = useState<InterestType>(
    isInterestType(initialInterest) ? initialInterest : "student"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot — bots fill hidden fields; humans don't.
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [pending, startTransition] = useTransition();

  const selected = INTERESTS.find((i) => i.id === interest) ?? INTERESTS[0];

  const action =
    FORMSPREE.contactId && `https://formspree.io/f/${FORMSPREE.contactId}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honey) return; // bot signal — silently drop

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill out name, email, and message.");
      return;
    }

    if (!action) {
      setStatus("error");
      setErrorMsg(
        "Contact form is not configured yet (missing NEXT_PUBLIC_FORMSPREE_CONTACT_ID). Email outreach@sparklabusa.com instead."
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
            interest,
            name: name.trim(),
            email: email.trim(),
            organization: organization.trim(),
            message: message.trim(),
            _subject: `[SparkLab] New ${interest} inquiry from ${name.trim()}`,
          }),
        });
        if (res.ok) {
          setStatus("success");
          setName("");
          setEmail("");
          setOrganization("");
          setMessage("");
        } else {
          const data = (await res.json().catch(() => null)) as
            | { errors?: Array<{ message: string }> }
            | null;
          setStatus("error");
          setErrorMsg(
            data?.errors?.[0]?.message ??
              "Something went wrong submitting the form. Please try again or email outreach@sparklabusa.com."
          );
        }
      } catch {
        setStatus("error");
        setErrorMsg(
          "We couldn't reach the form service. Please try again, or email outreach@sparklabusa.com."
        );
      }
    });
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[color:var(--color-electric)]/40 bg-[color:var(--color-electric)]/10 p-8 text-center">
        <CheckCircle2
          className="mx-auto h-10 w-10 text-[color:var(--color-electric)]"
          aria-hidden
        />
        <h3 className="mt-4 text-xl font-bold">Thanks — we got it.</h3>
        <p className="mt-2 text-[color:var(--color-fg-muted)]">
          We read every message and reply from{" "}
          <a
            href="mailto:outreach@sparklabusa.com"
            className="text-[color:var(--color-spark)] hover:underline"
          >
            outreach@sparklabusa.com
          </a>
          . Expect a response within 2 business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-[color:var(--color-spark)] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className="text-sm font-medium mb-3">I'm reaching out as…</legend>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {INTERESTS.map((opt) => {
            const Icon = opt.icon;
            const active = interest === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setInterest(opt.id)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-sm transition-all",
                  active
                    ? "border-[color:var(--color-spark)] bg-[color:var(--color-spark)]/10 text-[color:var(--color-fg)]"
                    : "border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-card)] text-[color:var(--color-fg-muted)] hover:border-[color:var(--color-spark)]/50 hover:text-[color:var(--color-fg)]"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" aria-hidden />
                <span className="font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Your name" htmlFor="contact-name" required>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={pending}
            className={fieldClass}
          />
        </Field>

        <Field label="Email" htmlFor="contact-email" required>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label={selected.orgLabel} htmlFor="contact-org">
        <input
          id="contact-org"
          name="organization"
          type="text"
          autoComplete="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder={selected.orgPlaceholder}
          disabled={pending}
          className={fieldClass}
        />
      </Field>

      <Field label="Message" htmlFor="contact-message" required>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={selected.messagePlaceholder}
          disabled={pending}
          className={cn(fieldClass, "resize-y min-h-[140px]")}
        />
      </Field>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">
          Don&apos;t fill this in
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--color-spark)] px-6 py-4 text-white font-semibold hover:bg-[color:var(--color-spark-strong)] transition-colors disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending
          </>
        ) : (
          <>
            <Send className="h-5 w-5" /> Send message
          </>
        )}
      </button>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-400 text-center">
          {errorMsg}
        </p>
      ) : null}

      <p className="text-xs text-[color:var(--color-fg-subtle)] text-center">
        We typically reply within 2 business days from{" "}
        <a
          href="mailto:outreach@sparklabusa.com"
          className="hover:text-[color:var(--color-spark)] underline-offset-2 hover:underline"
        >
          outreach@sparklabusa.com
        </a>
        .
      </p>
    </form>
  );
}

const fieldClass =
  "w-full rounded-lg bg-[color:var(--color-bg-card)] border border-[color:var(--color-border-strong)] px-4 py-3 text-[color:var(--color-fg)] placeholder:text-[color:var(--color-fg-subtle)] focus:outline-none focus:border-[color:var(--color-spark)]";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="block text-sm font-medium mb-2">
        {label}
        {required ? (
          <span className="text-[color:var(--color-spark)]" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </span>
      {children}
    </label>
  );
}
