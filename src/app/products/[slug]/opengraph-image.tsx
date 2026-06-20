import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/data/products";
import { siteConfig } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProductOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", background: "#0a0a0b" }} />,
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0a0a0b",
          backgroundImage: `radial-gradient(50% 60% at 20% 30%, ${product.accent}55, transparent 70%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "rgba(255,255,255,0.55)" }}>
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 120, lineHeight: 1 }}>{product.emoji}</div>
          <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, maxWidth: 900 }}>
            {product.name}
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.60)", maxWidth: 700 }}>
            {product.description.length > 120
              ? product.description.slice(0, 120) + "…"
              : product.description}
          </div>
        </div>

        <div style={{ fontSize: 36, fontWeight: 700, color: product.accent }}>
          From ${product.basePrice}
        </div>
      </div>
    ),
    { ...size },
  );
}
