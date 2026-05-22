"use client";

import { Sticker } from "@/types";

interface Props {
  sticker: Sticker;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  dimmed?: boolean;
}

export default function StickerCard({
  sticker,
  count,
  onIncrement,
  onDecrement,
  dimmed,
}: Props) {
  const isMissing = count === 0;
  const isHave = count === 1;
  const isDuplicate = count >= 2;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onDecrement();
  };

  let cardStyle: React.CSSProperties;
  if (isMissing) {
    cardStyle = {
      background: "#0b1020",
      border: "1px solid rgba(255,255,255,0.05)",
      color: "#334155",
    };
  } else if (isHave) {
    cardStyle = {
      background: "linear-gradient(155deg, #052e16 0%, #064e28 100%)",
      border: "1px solid rgba(34,197,94,0.32)",
      boxShadow: "0 0 14px rgba(34,197,94,0.08)",
      color: "#86efac",
    };
  } else {
    cardStyle = {
      background: "linear-gradient(155deg, #1a0e00 0%, #2d1a00 100%)",
      border: "1px solid rgba(251,191,36,0.38)",
      boxShadow: "0 0 14px rgba(251,191,36,0.1)",
      color: "#fcd34d",
    };
  }

  return (
    <button
      onClick={onIncrement}
      onContextMenu={handleContextMenu}
      title={`${sticker.code} – ${sticker.name}${sticker.isFoil ? " ✨" : ""}\nClick: +1 | Right-click: -1`}
      className={`
        sticker-card relative flex flex-col items-center justify-center
        rounded-lg text-center cursor-pointer overflow-hidden
        w-full aspect-[3/4] min-w-0 transition-all duration-150
        hover:scale-105 hover:z-10 active:scale-95
        ${!isMissing ? "sticker-collected" : ""}
        ${dimmed ? "opacity-20" : "opacity-100"}
      `}
      style={cardStyle}
    >
      {/* Foil iridescent overlay */}
      {sticker.isFoil && !isMissing && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.15), rgba(16,185,129,0.15), rgba(245,158,11,0.12))",
            backgroundSize: "300% 300%",
            animation: "foilShift 4s ease infinite",
          }}
        />
      )}

      {/* Foil badge */}
      {sticker.isFoil && (
        <span className="absolute top-0.5 right-0.5 text-[7px] leading-none z-10 opacity-80">
          ✨
        </span>
      )}

      {/* Sticker code */}
      <span className="font-display text-[11px] leading-tight break-all px-0.5 z-10">
        {sticker.code}
      </span>

      {/* Name */}
      <span
        className="text-[7px] leading-tight mt-0.5 line-clamp-1 px-1 z-10"
        style={{ opacity: 0.55 }}
      >
        {sticker.number === 1
          ? "Portada"
          : sticker.number === 13
            ? "Foto"
            : sticker.name}
      </span>

      {/* Duplicate count */}
      {isDuplicate && (
        <span
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[8px] font-black leading-none px-1 py-0.5 rounded-full z-10"
          style={{ background: "rgba(251,191,36,0.9)", color: "#000" }}
        >
          ×{count}
        </span>
      )}

      {/* Have check */}
      {isHave && (
        <span
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[10px] leading-none z-10"
          style={{ color: "#4ade80" }}
        >
          ✓
        </span>
      )}
    </button>
  );
}
