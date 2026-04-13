import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Roboway Technologies — Robotics, AI & Automation, Bangladesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #010409 0%, #020d1f 50%, #010409 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top-left glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Bottom-right glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-50px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* HUD readout top */}
        <div style={{
          position: "absolute",
          top: "36px",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "center",
          gap: "40px",
        }}>
          {["SYS::ONLINE", "DHAKA · BANGLADESH", "AI · ROBOTICS · AUTOMATION"].map((t) => (
            <span key={t} style={{ fontSize: "11px", color: "rgba(96,165,250,0.5)", letterSpacing: "2px", display: "flex" }}>{t}</span>
          ))}
        </div>

        {/* Corner lines top-left */}
        <div style={{ position: "absolute", top: "28px", left: "28px", display: "flex", flexDirection: "column" }}>
          <div style={{ width: "24px", height: "2px", background: "#2563eb", display: "flex" }} />
          <div style={{ width: "2px", height: "24px", background: "#2563eb", display: "flex" }} />
        </div>
        {/* Corner lines top-right */}
        <div style={{ position: "absolute", top: "28px", right: "28px", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ width: "24px", height: "2px", background: "#2563eb", display: "flex" }} />
          <div style={{ width: "2px", height: "24px", background: "#2563eb", display: "flex", alignSelf: "flex-end" }} />
        </div>
        {/* Corner lines bottom-left */}
        <div style={{ position: "absolute", bottom: "28px", left: "28px", display: "flex", flexDirection: "column" }}>
          <div style={{ width: "2px", height: "24px", background: "#2563eb", display: "flex" }} />
          <div style={{ width: "24px", height: "2px", background: "#2563eb", display: "flex" }} />
        </div>
        {/* Corner lines bottom-right */}
        <div style={{ position: "absolute", bottom: "28px", right: "28px", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ width: "2px", height: "24px", background: "#2563eb", display: "flex", alignSelf: "flex-end" }} />
          <div style={{ width: "24px", height: "2px", background: "#2563eb", display: "flex" }} />
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(37,99,235,0.12)",
            border: "1px solid rgba(37,99,235,0.3)",
            borderRadius: "999px",
            padding: "8px 20px",
            marginBottom: "28px",
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563eb", display: "flex" }} />
          <span style={{ fontSize: "13px", color: "#60a5fa", letterSpacing: "3px", display: "flex" }}>
            ROBOWAY TECHNOLOGIES
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: "74px",
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0px",
          }}
        >
          <span style={{ display: "flex" }}>Robotics,&nbsp;</span>
          <span style={{ display: "flex", color: "#60a5fa" }}>AI</span>
          <span style={{ display: "flex" }}>&nbsp;&amp;&nbsp;</span>
          <span style={{ display: "flex", color: "#60a5fa" }}>Automation</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "20px",
            color: "rgba(160,174,192,0.9)",
            textAlign: "center",
            maxWidth: "720px",
            lineHeight: 1.6,
            marginBottom: "40px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          Bangladesh&apos;s leading robotics &amp; AI company — humanoid robots, VTOL drones, AI surveillance &amp; intelligent software.
        </div>

        {/* Product pills */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          {["Pixi Robot", "Tanvin Drone", "DetectX", "Aquabot AUV", "i-Care AI"].map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                background: "rgba(37,99,235,0.08)",
                border: "1px solid rgba(37,99,235,0.25)",
                borderRadius: "6px",
                padding: "7px 16px",
                fontSize: "13px",
                color: "rgba(96,165,250,0.85)",
                letterSpacing: "1px",
              }}
            >
              {p}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div style={{
          position: "absolute",
          bottom: "36px",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "center",
        }}>
          <span style={{ fontSize: "13px", color: "rgba(96,165,250,0.4)", letterSpacing: "2px", display: "flex" }}>
            roboway.tech
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
