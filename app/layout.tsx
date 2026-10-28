import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import Providers from "@/components/Providers";
import { profile } from "@/data/content";
import { introScript } from "@/lib/intro";

const title = `${profile.firstName} ${profile.lastName} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title,
  description:
    "Portfolio de Ray Kambandje, développeur full-stack : plateformes web, paiement Mobile Money, systèmes académiques.",
  alternates: { canonical: "/" },
  // L'image d'aperçu est générée par app/opengraph-image.tsx
  openGraph: {
    title,
    description: "Je conçois des produits web fiables, pensés pour la RDC.",
    url: "/",
    siteName: `${profile.firstName} ${profile.lastName}`,
    type: "website",
    locale: "fr_FR",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning : introScript ajoute data-intro sur <html> avant React
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
