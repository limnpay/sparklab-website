import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: SITE.themeColor,
    theme_color: SITE.themeColor,
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["education", "business"],
  };
}
