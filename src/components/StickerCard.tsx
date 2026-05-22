"use client";

import { useEffect, useRef, useState } from "react";
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
  const [justCollected, setJustCollected] = useState(false);
  const prevCount = useRef(count);

  // Flash animation when a sticker goes from 0 → 1 (first collected)
  useEffect(() => {
    if (prevCount.current === 0 && count === 1) {
      setJustCollected(true);
      const id = setTimeout(() => setJustCollected(false), 700);
      return () => clearTimeout(id);
    }
    prevCount.current = count;
  }, [count]);

  const state: "missing" | "have" | "duplicate" =
    count === 0 ? "missing" : count === 1 ? "have" : "duplicate";

  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey) onDecrement();
    else onIncrement();
  };

  const handleContext = (e: React.MouseEvent) => {
    e.preventDefault();
    onDecrement();
  };

  const className = [
    "sk",
    sticker.isFoil && state !== "missing" ? "sk-foil" : "",
    justCollected ? "sk-collected-flash" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const numLabel =
    sticker.number > 0 ? String(sticker.number).padStart(2, "0") : "—";

  return (
    <button
      className={className}
      data-state={state}
      data-dimmed={dimmed ? "true" : "false"}
      onClick={handleClick}
      onContextMenu={handleContext}
      title={[
        `${sticker.code} — ${sticker.name}`,
        sticker.isFoil ? "✦ FOIL" : "",
        "Click: +1  ·  Right-click / Shift+click: −1",
      ]
        .filter(Boolean)
        .join("\n")}
    >
      {/* Foil iridescent overlay (applied via CSS ::before on .sk-foil) */}
      {sticker.isFoil && <span className="sk-foil-mark" aria-hidden="true" />}

      {/* Top section: big number + small code */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2, position: "relative", zIndex: 2 }}>
        <span className="sk-num">{numLabel}</span>
        <span className="sk-code">{sticker.code}</span>
      </div>

      {/* Bottom: player / item name */}
      <span className="sk-name" style={{ position: "relative", zIndex: 2 }}>
        {sticker.name}
      </span>

      {/* Duplicate count pill (top-right) */}
      {count >= 2 && (
        <span className="sk-count-pill" aria-label={`${count} copies`}>
          ×{count}
        </span>
      )}

      {/* Collected checkmark (bottom-right) */}
      {count === 1 && (
        <span className="sk-check" aria-hidden="true">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </button>
  );
  
}
