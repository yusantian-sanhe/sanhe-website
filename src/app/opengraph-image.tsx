import { ImageResponse } from "next/og";
import { company } from "@/constants/company";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#065f46",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700 }}>
          {company.name}
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Reliable Fresh Produce & Frozen Food Supply Chain Solutions
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 28,
            color: "#d1fae5",
            maxWidth: 850,
            lineHeight: 1.4,
          }}
        >
          Fresh vegetables, fresh fruits, frozen foods and prepared food
          solutions for global buyers.
        </div>

        <div
          style={{
            marginTop: 56,
            display: "flex",
            gap: 20,
            fontSize: 22,
            color: "#ecfdf5",
          }}
        >
          <span>Own Planting Bases</span>
          <span>•</span>
          <span>Cold Chain Warehousing</span>
          <span>•</span>
          <span>OEM & Private Label</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}