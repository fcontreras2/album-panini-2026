"use client";

import { Language } from "@/types";
import { t } from "@/lib/i18n";

interface Props {
  lang: Language;
  onToggleLang: () => void;
}

export default function Header({ lang, onToggleLang }: Props) {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background: "linear-gradient(145deg, #1a3a5c 0%, #0c1f38 100%)",
            border: "1px solid rgba(251,191,36,0.28)",
            boxShadow: "0 0 18px rgba(251,191,36,0.08)",
          }}
        >
          ⚽
        </div>
        <div>
          <h1 className="font-display text-[22px] leading-none text-gold">
            {lang === "es" ? "ÁLBUM PANINI" : "PANINI ALBUM"}
          </h1>
          <p
            className="text-[9px] font-semibold tracking-[0.22em] mt-0.5 uppercase"
            style={{ color: "#64748b" }}
          >
            FIFA World Cup 2026
          </p>
        </div>
      </div>

      <button
        onClick={onToggleLang}
        className="px-3 py-1.5 rounded-md text-[11px] font-bold tracking-widest uppercase transition-all duration-200"
        style={{
          background: "rgba(251,191,36,0.08)",
          border: "1px solid rgba(251,191,36,0.25)",
          color: "#fbbf24",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = "rgba(251,191,36,0.16)";
          el.style.borderColor = "rgba(251,191,36,0.45)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = "rgba(251,191,36,0.08)";
          el.style.borderColor = "rgba(251,191,36,0.25)";
        }}
      >
        {t(lang, "languageToggle")}
      </button>
    </header>
  );
}
