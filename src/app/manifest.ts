import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff3333",
    icons: [
      { src: "/icon.svg",     sizes: "any",     type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png",     purpose: "maskable" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png",     purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png",     purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png",     purpose: "any" },
    ],
    categories: ["food", "shopping"],
    shortcuts: [
      {
        name: "View Menu",
        short_name: "Menu",
        description: "Browse all Aurora Bakehouse products",
        url: "/products",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
    scope: "/",
    orientation: "portrait",
  };
}
