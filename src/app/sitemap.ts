import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE
    ? new Date(process.env.NEXT_PUBLIC_BUILD_DATE)
    : new Date("2026-06-20");
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/about", priority: 0.7 },
  ];

  const staticRoutes = routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: BUILD_DATE,
    changeFrequency: "weekly" as const,
    priority,
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
