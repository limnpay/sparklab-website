"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        isScrolled
          ? "bg-[color:var(--color-bg)]/60 backdrop-blur-xl border-b border-[color:var(--color-border)] shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]"
          : "bg-transparent"
      )}
    >
      <div className="container-prose">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-3 min-w-0">
          <Link
            href="/"
            aria-label="SparkLab home"
            className="group relative flex items-center gap-3 focus:outline-none"
          >
            <span
              aria-hidden
              className="absolute -inset-3 rounded-full bg-[color:var(--color-electric)]/0 blur-xl transition-all duration-500 group-hover:bg-[color:var(--color-electric)]/25"
            />
            <Image
              src="/images/sparklab-logo.png"
              alt="SparkLab"
              width={140}
              height={32}
              priority
              className="relative h-8 w-auto transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-0.5 min-w-0"
          >
            {ROUTES.map((item) =>
              "children" in item ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  onFocus={() => setOpenDropdown(item.label)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md flex items-center gap-1.5",
                      "transition-colors",
                      item.children.some((c) => isActive(c.href))
                        ? "text-[color:var(--color-spark)]"
                        : "text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-1 min-w-56 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] shadow-2xl py-2"
                    >
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          role="menuitem"
                          className={cn(
                            "block px-4 py-2.5 text-sm transition-colors",
                            isActive(c.href)
                              ? "text-[color:var(--color-spark)] bg-white/5"
                              : "text-[color:var(--color-fg)] hover:bg-white/5"
                          )}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "text-[color:var(--color-spark)]"
                      : "text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]"
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex shrink-0 items-center gap-2">
            <DonateTab active={isActive("/donate")} />
            <Link
              href="/contact"
              data-cursor="cta"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[color:var(--color-spark)] text-white text-sm font-semibold overflow-hidden transition-transform hover:-translate-y-0.5"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Get Started</span>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <DonateTab active={isActive("/donate")} />
            <button
              type="button"
              className="p-2 rounded-md text-[color:var(--color-fg)]"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <nav
          aria-label="Mobile"
          className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-[color:var(--color-bg)]/98 backdrop-blur-md border-t border-[color:var(--color-border)] overflow-y-auto"
        >
          <div className="container-prose py-6 flex flex-col gap-1">
            {ROUTES.map((item) =>
              "children" in item ? (
                <details
                  key={item.label}
                  className="group rounded-lg"
                  open={item.children.some((c) => isActive(c.href))}
                >
                  <summary className="flex items-center justify-between px-3 py-3 cursor-pointer list-none font-medium text-[color:var(--color-fg)] [&::-webkit-details-marker]:hidden">
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pl-3 pb-2 flex flex-col gap-1">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={cn(
                          "px-3 py-2.5 text-sm rounded-md transition-colors",
                          isActive(c.href)
                            ? "text-[color:var(--color-spark)] bg-white/5"
                            : "text-[color:var(--color-fg-muted)] hover:bg-white/5"
                        )}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-3 rounded-lg font-medium transition-colors",
                    isActive(item.href)
                      ? "text-[color:var(--color-spark)] bg-white/5"
                      : "text-[color:var(--color-fg)] hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            <ButtonLink
              href="/donate"
              variant="outline"
              className="mt-4 w-full border-[color:var(--color-spark)] text-[color:var(--color-spark)] hover:bg-[color:var(--color-spark)] hover:text-white"
            >
              Donate
            </ButtonLink>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[color:var(--color-spark)] text-white font-semibold"
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function DonateTab({ active }: { active: boolean }) {
  return (
    <ButtonLink
      href="/donate"
      variant="outline"
      className={cn(
        "border-[color:var(--color-spark)] text-[color:var(--color-spark)] hover:bg-[color:var(--color-spark)] hover:text-white",
        active && "bg-[color:var(--color-spark)] text-white"
      )}
      aria-current={active ? "page" : undefined}
    >
      Donate
    </ButtonLink>
  );
}
