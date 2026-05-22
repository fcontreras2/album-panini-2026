"use client";

import { useState, useRef, useEffect } from "react";
import { Sticker } from "@/types";

interface Props {
  sticker: Sticker;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  dimmed?: boolean;
}

export default function StickerCard({ sticker, count, onIncrement, onDecrement, dimmed }: Props) {
  const [justCollected, setJustCollected] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (prevCount.current === 0 && count === 1) {
      setJustCollected(true);
      const id = setTimeout(() => setJustCollected(false), 700);
      return () => clearTimeout(id);
    }
    prevCount.current = count;
  }, [count]);

  const state = count === 0 ? "missing" : count === 1 ? "have" : "duplicate";

  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey) onDecrement();
    else onIncrement();
  };
  const handleContext = (e: React.MouseEvent) => {
    e.preventDefault();
    onDecrement();
  };

  const display =
    sticker.number === 1 ? sticker.name || "Portada" : sticker.number === 2 ? sticker.name || "Badge" : sticker.name;

  const classNames = [
    "sk",
    sticker.isFoil && state !== "missing" ? "sk-foil" : "",
    justCollected ? "sk-collected-flash" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classNames}
      data-state={state}
      data-dimmed={dimmed ? "true" : "false"}
      onClick={handleClick}
      onContextMenu={handleContext}
      title={`${sticker.code} — ${display}${sticker.isFoil ? " ✦ FOIL" : ""}\nClick: +1  ·  Right-click / Shift+click: −1`}
    >
      {sticker.isFoil && <span className="sk-foil-mark" aria-hidden="true" />}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          zIndex: 2,
          position: "relative",
        }}
      >
        <span className="sk-num">
          {sticker.number > 0 ? String(sticker.number).padStart(2, "0") : "—"}
        </span>
        <span className="sk-code">{sticker.code}</span>
      </div>

      <span className="sk-name" style={{ zIndex: 2, position: "relative" }}>
        {display}
      </span>

      {count >= 2 && <span className="sk-count-pill">×{count}</span>}
      {count === 1 && (
        <span className="sk-check">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </button>
  );
}
