"use client";

import { Language, Theme } from "@/types";
import { t } from "@/lib/i18n";

interface Props {
  lang: Language;
  theme: Theme;
  onToggleLang: () => void;
  onToggleTheme: () => void;
}

export default function Header({ lang, theme, onToggleLang, onToggleTheme }: Props) {
  return (
    <header className="app-header">
      <div style={{ display: "flex", alignItems: "flex-end", gap: 20, minWidth: 0 }}>
        {/* Custom mark — champagne six-pointed star inside concentric rings */}
        <div style={{ flexShrink: 0, width: 44, height: 44 }}>
          <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">
            <defs>
              <linearGradient id="markGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--gold-light)" />
                <stop offset="100%" stopColor="var(--gold-deep)" />
              </linearGradient>
            </defs>
            <circle cx="22" cy="22" r="21" fill="none" stroke="var(--hairline)" />
            <circle cx="22" cy="22" r="14" fill="none" stroke="var(--gold)" strokeOpacity="0.5" />
            <path
              d="M22 6 L24.5 19.5 L38 22 L24.5 24.5 L22 38 L19.5 24.5 L6 22 L19.5 19.5 Z"
              fill="url(#markGrad)"
              opacity="0.92"
            />
          </svg>
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            className="font-mono"
            style={{
              fontSize: 9.5,
              letterSpacing: "0.28em",
              color: "var(--ink-3)",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            <span style={{ color: "var(--gold)" }}>●</span>
            &nbsp;&nbsp;FIFA World Cup&nbsp;&nbsp;·&nbsp;&nbsp;Canada · Mexico · USA&nbsp;&nbsp;·&nbsp;&nbsp;Edition 26
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(34px, 5vw, 52px)",
              lineHeight: 0.92,
              letterSpacing: "0.005em",
              color: "var(--ink)",
              margin: 0,
            }}
          >
            {t(lang, "title")}
            <span
              className="font-serif"
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "0.62em",
                marginLeft: "0.32em",
                color: "var(--gold)",
                letterSpacing: "-0.01em",
              }}
            >
              2026
            </span>
          </h1>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <button onClick={onToggleTheme} className="btn-ghost" title="Toggle theme">
          {theme === "dark" ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
          <span style={{ fontSize: 10, letterSpacing: "0.12em" }}>
            {theme === "dark" ? t(lang, "themeLight") : t(lang, "themeDark")}
          </span>
        </button>
        <button onClick={onToggleLang} className="btn-ghost" title="Toggle language">
          <span style={{ color: "var(--gold)", fontSize: 10, letterSpacing: "0.12em", fontWeight: 700 }}>
            {t(lang, "languageToggle")}
          </span>
        </button>
      </div>
    </header>
  );
}
