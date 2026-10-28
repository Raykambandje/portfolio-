import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { marqueeItems, profile } from "@/data/content";
import { LOGO_BOWL, LOGO_LEG } from "@/lib/logo";

// Image d'aperçu affichée quand le lien du site est partagé (WhatsApp, LinkedIn…)
export const alt = `${profile.firstName} ${profile.lastName} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const name = `${profile.firstName} ${profile.lastName},`;
const role = "développeur full-stack.";

// Inter Tight (police des titres du site), téléchargée une fois au build.
// Si Google Fonts ne répond pas, l'image est générée avec la police mono.
async function displayFont() {
  try {
    const text = encodeURIComponent(name + role);
    const css = await fetch(`https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600&text=${text}`).then((r) =>
      r.text()
    );
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const [display, mono] = await Promise.all([
    displayFont(),
    readFile(join(process.cwd(), "node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: "#fafaf9",
          color: "#0c0a09",
          fontFamily: "JetBrains Mono",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <svg width="88" height="88" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="26" fill="#0c0a09" />
            <path
              d={`${LOGO_BOWL}${LOGO_LEG}`}
              fill="none"
              stroke="#fff"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="71" y="68" width="11" height="9" rx="2" fill="#2b4acb" />
          </svg>
          <div style={{ fontSize: 20, letterSpacing: "0.14em", textTransform: "uppercase", color: "#57534e" }}>
            Portfolio
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Inter Tight",
            fontSize: 88,
            fontWeight: 600,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
          }}
        >
          <div>{name}</div>
          <div style={{ color: "#a8a29e" }}>{role}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #e7e5e4",
            paddingTop: 28,
            fontSize: 20,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#57534e",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#2b4acb" }} />
            {profile.company}
          </div>
          <div>{marqueeItems.slice(0, 4).join(" · ")}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
        ...(display ? [{ name: "Inter Tight", data: display, weight: 600 as const, style: "normal" as const }] : []),
      ],
    }
  );
}
