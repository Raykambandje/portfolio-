import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Ray Kambandje — Développeur full-stack",
  description:
    "Portfolio de Ray Kambandje, développeur full-stack : plateformes web, paiement Mobile Money, systèmes académiques.",
  openGraph: {
    title: "Ray Kambandje — Développeur full-stack",
    description: "Je conçois des produits web fiables, pensés pour la RDC.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
