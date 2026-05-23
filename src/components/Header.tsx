"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Language, SectionHeaderStyle, Theme } from "@/types";
import { t } from "@/lib/i18n";
import HowItWorks from "./HowItWorks";

interface Props {
  lang: Language;
  theme: Theme;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  sectionHeaderStyle: SectionHeaderStyle;
  onCycleSectionStyle: () => void;
}

export default function Header({
  lang,
  theme,
  onToggleLang,
  onToggleTheme,
  sectionHeaderStyle,
  onCycleSectionStyle,
}: Props) {
  const [dropOpen, setDropOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ top: 0, right: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Calculate portal position when opening
  const handleToggle = () => {
    if (!dropOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropPos({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      });
    }
    setDropOpen((v) => !v);
  };

  // Close on outside click (checks both portal div and trigger button)
  useEffect(() => {
    if (!dropOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDrop = dropRef.current?.contains(target);
      const inTrigger = triggerRef.current?.contains(target);
      if (!inDrop && !inTrigger) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropOpen]);

  // Close on Escape
  useEffect(() => {
    if (!dropOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dropOpen]);

  const sectionLabel =
    sectionHeaderStyle === "minimal" ? "MIN" :
    sectionHeaderStyle === "chip"    ? "CHIP" : "BNR";

  const dropdown = mounted && dropOpen
    ? createPortal(
        <div
          ref={dropRef}
          style={{
            position: "fixed",
            top: dropPos.top,
            right: dropPos.right,
            zIndex: 999,
            background: "var(--surface-2)",
            border: "1px solid var(--hairline)",
            borderRadius: "var(--radius)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
            minWidth: 190,
            overflow: "hidden",
          }}
        >
          {/* How it works */}
          <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--hairline-2)" }}>
            <HowItWorks lang={lang} />
          </div>

          {/* Theme */}
          <button
            onClick={() => { onToggleTheme(); setDropOpen(false); }}
            className="hdr-drop-item"
          >
            <ThemeIcon theme={theme} />
            <span>{theme === "dark" ? t(lang, "themeLight") : t(lang, "themeDark")}</span>
          </button>

          {/* Language */}
          <button
            onClick={() => { onToggleLang(); setDropOpen(false); }}
            className="hdr-drop-item"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
            </svg>
            <span style={{ color: "var(--gold)", fontWeight: 700 }}>
              {t(lang, "languageToggle")}
            </span>
          </button>

          {/* Section header style */}
          <button
            onClick={() => { onCycleSectionStyle(); }}
            className="hdr-drop-item"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
            <span>
              {lang === "es" ? "Sección" : "Section style"}
              <span
                className="font-mono"
                style={{
                  marginLeft: 8,
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                }}
              >
                {sectionLabel}
              </span>
            </span>
          </button>
        </div>,
        document.body
      )
    : null;

  return (
    <header className="app-header">
      {/* ── Left: logo + title ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
        {/* Mark — hidden on mobile via CSS */}
        <div className="hdr-mark" style={{ flexShrink: 0 }}>
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
          {/* Subtitle — hidden on mobile via CSS */}
          <div
            className="hdr-subtitle font-mono"
            style={{
              fontSize: 9,
              letterSpacing: "0.24em",
              color: "var(--ink-3)",
              textTransform: "uppercase",
              marginBottom: 3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ color: "var(--gold)" }}>●</span>
            &nbsp;&nbsp;FIFA World Cup&nbsp;&nbsp;·&nbsp;&nbsp;Canada · Mexico · USA
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(26px, 4vw, 46px)",
              lineHeight: 0.92,
              letterSpacing: "0.005em",
              color: "var(--ink)",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {t(lang, "title")}
            <span
              className="font-serif"
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "0.60em",
                marginLeft: "0.28em",
                color: "var(--gold)",
                letterSpacing: "-0.01em",
              }}
            >
              2026
            </span>
          </h1>
        </div>
      </div>

      {/* ── Right: desktop controls (hidden on mobile via CSS) ── */}
      <div className="hdr-controls-desktop" style={{ alignItems: "center", gap: 8, flexShrink: 0 }}>
        <HowItWorks lang={lang} />
        <button onClick={onToggleTheme} className="btn-ghost" title="Toggle theme">
          <ThemeIcon theme={theme} />
          <span style={{ fontSize: 10, letterSpacing: "0.12em" }}>
            {theme === "dark" ? t(lang, "themeLight") : t(lang, "themeDark")}
          </span>
        </button>
        <button onClick={onToggleLang} className="btn-ghost">
          <span style={{ color: "var(--gold)", fontSize: 10, letterSpacing: "0.12em", fontWeight: 700 }}>
            {t(lang, "languageToggle")}
          </span>
        </button>
      </div>

      {/* ── Right: mobile dropdown trigger (hidden on desktop via CSS) ── */}
      <div className="hdr-controls-mobile" style={{ flexShrink: 0 }}>
        <button
          ref={triggerRef}
          className="btn-ghost hdr-dropdown-trigger"
          onClick={handleToggle}
          aria-label="Opciones"
          aria-expanded={dropOpen}
          style={{
            gap: 5,
            background: dropOpen ? "var(--gold-bg)" : "transparent",
            borderColor: dropOpen ? "rgba(212,168,87,0.45)" : "var(--hairline-2)",
            color: dropOpen ? "var(--gold-light)" : "var(--ink-2)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5"  r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="19" r="1.8" />
          </svg>
        </button>
      </div>

      {/* Dropdown — rendered via portal to escape overflow:hidden parents */}
      {dropdown}
    </header>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return theme === "dark" ? (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
