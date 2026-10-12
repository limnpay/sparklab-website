/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SparkLab — Fuel the Spark. Find Your Light.";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #00343D 0%, #003B46 50%, #002b34 100%)",
          color: "#E2E2E2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(120,217,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,217,0,0.07) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Orange spark */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(255,92,34,0.45) 0%, rgba(255,92,34,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#78D900",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            SparkLab
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>
              Fuel the&nbsp;<span style={{ color: "#FF5C22" }}>Spark.</span>
            </span>
            <span style={{ display: "flex" }}>
              Find Your&nbsp;<span style={{ color: "#78D900" }}>Light.</span>
            </span>
          </div>
          <div
            style={{
              fontSize: 32,
              marginTop: 24,
              color: "rgba(226,226,226,0.85)",
              maxWidth: 880,
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            An immersive 8-week entrepreneurship program for high school students.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 1,
            fontSize: 24,
            color: "rgba(226,226,226,0.7)",
          }}
        >
          <span style={{ display: "flex" }}>Year 2 · Macomb County · sparklabusa.com</span>
          <span
            style={{
              padding: "12px 24px",
              borderRadius: 12,
              background: "#FF5C22",
              color: "white",
              fontWeight: 700,
              display: "flex",
            }}
          >
            Pitch. Compete. Win.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
