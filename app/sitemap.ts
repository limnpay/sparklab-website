import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { CITIES } from "@/lib/cities";
import { getAllPosts } from "@/lib/posts";

const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/program", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/students", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/schools", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/mentors", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/competition", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/cohorts", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/donate", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const cityEntries = CITIES.map((c) => ({
    url: `${SITE.url}/schools/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postEntries = getAllPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.date + "T00:00:00"),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...cityEntries, ...postEntries];
}
