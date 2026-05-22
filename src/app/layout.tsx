import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Outfit, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PWARegister from "@/components/PWARegister";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "El Álbum 2026 — FIFA World Cup",
  description: "Administra tu álbum de cromos del Mundial 2026 — 980 cromos, sin servidor.",
  applicationName: "El Álbum 2026",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Álbum 2026",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0c12" },
    { media: "(prefers-color-scheme: light)", color: "#f4efe5" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${outfit.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
