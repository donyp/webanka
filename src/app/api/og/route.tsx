import { ImageResponse } from "next/og";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "ANKA";
  const subtitle = searchParams.get("subtitle") ?? "Supplier & Distributor Aksesoris Konstruksi";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#0b1b2b",
          color: "#f6f4ee",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#3d3b6b" }} />
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#3d3b6b" }}>
            ANKA
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: "900px" }}>
            {title}
          </span>
          <span style={{ fontSize: 24, color: "#a0aec0", maxWidth: "800px" }}>
            {subtitle}
          </span>
        </div>
        <span style={{ fontSize: 18, color: "#5e6b78" }}>anka.co.id</span>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}