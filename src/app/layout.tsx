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

/* ── Splash styles — injected into <head> so they're available before any JS ── */
const splashCSS = `
  #app-splash {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    background: #0a0c12;
    color: #ece9e2;
    font-family: system-ui, sans-serif;
    user-select: none;
    pointer-events: none;
  }
  @media (prefers-color-scheme: light) {
    #app-splash { background: #f4efe5; color: #1a1814; }
    #app-splash .sp-line { background: rgba(138,111,58,0.15); }
    #app-splash .sp-shimmer { background: linear-gradient(90deg, transparent, rgba(138,111,58,0.5), transparent); }
  }

  /* Star pulse */
  @keyframes sp-pulse {
    0%, 100% { transform: scale(1);    opacity: 0.85; }
    50%       { transform: scale(1.08); opacity: 1; }
  }
  #app-splash .sp-star { animation: sp-pulse 2.2s ease-in-out infinite; transform-origin: center; }

  /* Shimmer bar */
  @keyframes sp-shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
  }
  #app-splash .sp-bar {
    position: relative;
    width: 140px;
    height: 2px;
    border-radius: 2px;
    background: rgba(212,168,87,0.15);
    overflow: hidden;
    margin-top: 28px;
  }
  #app-splash .sp-shimmer {
    position: absolute;
    top: 0; left: 0;
    width: 30%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(212,168,87,0.8), transparent);
    animation: sp-shimmer 1.4s ease-in-out infinite;
  }

  /* Dots */
  @keyframes sp-dot {
    0%, 80%, 100% { opacity: 0.2; transform: scaleY(0.6); }
    40%            { opacity: 1;   transform: scaleY(1); }
  }
  #app-splash .sp-dots { display: flex; gap: 5px; margin-top: 20px; }
  #app-splash .sp-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: #d4a857;
    animation: sp-dot 1.2s ease-in-out infinite;
  }
  #app-splash .sp-dot:nth-child(2) { animation-delay: 0.2s; }
  #app-splash .sp-dot:nth-child(3) { animation-delay: 0.4s; }
`;

/* ── Script — removes the splash after the page loads ── */
const splashScript = `
(function() {
  var start = Date.now();
  function dismiss() {
    var el = document.getElementById('app-splash');
    if (!el) return;
    el.style.transition = 'opacity 0.55s ease';
    el.style.opacity = '0';
    setTimeout(function() { if (el && el.parentNode) el.parentNode.removeChild(el); }, 580);
  }
  function schedule() {
    var elapsed = Date.now() - start;
    var wait = Math.max(0, 900 - elapsed);
    setTimeout(dismiss, wait);
  }
  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule, { once: true });
  }
})();
`;

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
      <head>
        {/* Splash styles available before any JS or CSS bundle loads */}
        <style dangerouslySetInnerHTML={{ __html: splashCSS }} />
      </head>
      <body>
        {/* ── PWA Splash screen — pure HTML/CSS, no JS dependency ── */}
        <div id="app-splash" aria-hidden="true">
          {/* Star mark */}
          <div className="sp-star">
            <svg viewBox="0 0 88 88" width="88" height="88">
              <defs>
                <linearGradient id="sp-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e8c885" />
                  <stop offset="100%" stopColor="#8a6f3a" />
                </linearGradient>
              </defs>
              <circle cx="44" cy="44" r="42" fill="none" stroke="rgba(212,168,87,0.18)" strokeWidth="1" />
              <circle cx="44" cy="44" r="28" fill="none" stroke="rgba(212,168,87,0.30)" strokeWidth="1" />
              <path
                d="M44 10 L48 37 L75 44 L48 51 L44 78 L40 51 L13 44 L40 37 Z"
                fill="url(#sp-grad)"
              />
            </svg>
          </div>

          {/* Title */}
          <div style={{ marginTop: 20, textAlign: "center", lineHeight: 1 }}>
            <div style={{
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: "0.06em",
              color: "#ece9e2",
              fontFamily: "system-ui, sans-serif",
              textTransform: "uppercase",
            }}>
              El Álbum
            </div>
            <div style={{
              fontSize: 18,
              letterSpacing: "0.18em",
              color: "#d4a857",
              fontFamily: "monospace",
              marginTop: 4,
            }}>
              2026
            </div>
          </div>

          {/* Shimmer progress bar */}
          <div className="sp-bar">
            <div className="sp-shimmer" />
          </div>

          {/* Dots */}
          <div className="sp-dots">
            <div className="sp-dot" />
            <div className="sp-dot" />
            <div className="sp-dot" />
          </div>

          {/* Label */}
          <div style={{
            marginTop: 10,
            fontSize: 9,
            letterSpacing: "0.32em",
            color: "rgba(212,168,87,0.5)",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}>
            Cargando
          </div>
        </div>

        {children}
        <PWARegister />

        {/* Remove splash once app loads — inline so it runs as soon as possible */}
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
      </body>
    </html>
  );
}
