import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          backgroundImage:
            "radial-gradient(40% 50% at 12% 16%, rgba(255,51,51,0.55), transparent 70%), radial-gradient(45% 55% at 90% 90%, rgba(255,122,71,0.4), transparent 70%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #ff3333, #d11414)",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            Crafted by hand.
          </div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            <span style={{ color: "#ff5e5e" }}>Baked for the future.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.6)" }}>
            Sourdough · Pastries · Cakes
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 56 }}>
            <span>🥐</span>
            <span>🍞</span>
            <span>🎂</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
