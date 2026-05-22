"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Language } from "@/types";

/* ─── Step icons (custom SVG, no emojis) ────────────────────── */

function IcoAlbum() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      {[0,1,2].map(col => [0,1].map(row => {
        const x = 1 + col * 10, y = 2 + row * 13;
        const filled = (col + row) % 3 !== 2;
        return (
          <rect key={`${col}-${row}`} x={x} y={y} width="8" height="11" rx="1.8"
            fill={filled ? "color-mix(in oklab, var(--gold) 18%, transparent)" : "transparent"}
            stroke={filled ? "var(--gold)" : "var(--hairline-3)"}
            strokeWidth={filled ? "1.4" : "1"}
          />
        );
      }))}
      {/* checkmark on first card */}
      <path d="M3 9 l2 2 4-4" stroke="var(--have)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* ×2 on second */}
      <text x="16" y="11" textAnchor="middle" fontSize="5" fill="var(--dup)" fontFamily="monospace" fontWeight="700">×2</text>
      {/* dash on last */}
      <line x1="24" y1="8" x2="28" y2="8" stroke="var(--hairline-3)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="24" y1="20" x2="28" y2="20" stroke="var(--hairline-3)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IcoClick() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      {/* Ripple circles */}
      <circle cx="15" cy="15" r="13" stroke="var(--gold)" strokeWidth="0.8" opacity="0.25" />
      <circle cx="15" cy="15" r="9" stroke="var(--gold)" strokeWidth="0.8" opacity="0.45" />
      {/* Center tap dot */}
      <circle cx="15" cy="15" r="5" fill="var(--gold)" />
      {/* Plus sign */}
      <line x1="15" y1="12.5" x2="15" y2="17.5" stroke="#1a1408" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="12.5" y1="15" x2="17.5" y2="15" stroke="#1a1408" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IcoProgress() {
  const r = 11, cx = 15, cy = 15;
  const circ = 2 * Math.PI * r;
  const fill = 0.68 * circ;
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx={cx} cy={cy} r={r} stroke="var(--hairline-3)" strokeWidth="3" />
      <circle cx={cx} cy={cy} r={r}
        stroke="var(--gold)" strokeWidth="3"
        strokeDasharray={`${fill} ${circ - fill}`}
        strokeDashoffset={circ / 4}
        strokeLinecap="round"
      />
      <text x={cx} y={cy + 3} textAnchor="middle" fontSize="6" fill="var(--gold)" fontFamily="monospace" fontWeight="700">68%</text>
    </svg>
  );
}

function IcoSearch() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      {/* Magnifying glass */}
      <circle cx="12" cy="12" r="8" stroke="var(--gold)" strokeWidth="1.6" />
      <line x1="18" y1="18" x2="27" y2="27" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
      {/* Filter lines inside lens */}
      <line x1="8"  y1="10" x2="16" y2="10" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="9"  y1="13" x2="15" y2="13" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="10" y1="16" x2="14" y2="16" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function IcoTrade() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      {/* Two cards */}
      <rect x="2" y="8" width="12" height="16" rx="2.5" fill="color-mix(in oklab, var(--dup) 15%, transparent)" stroke="var(--dup)" strokeWidth="1.3" />
      <text x="8" y="18" textAnchor="middle" fontSize="6" fill="var(--dup)" fontFamily="monospace" fontWeight="700">×2</text>
      <rect x="16" y="8" width="12" height="16" rx="2.5" fill="color-mix(in oklab, var(--have) 15%, transparent)" stroke="var(--have)" strokeWidth="1.3" />
      {/* Copy arrow */}
      <path d="M13 14 Q15 12 17 14" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M13 18 Q15 20 17 18" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" />
      {/* arrowheads */}
      <polygon points="11.5,13 13,14 11.5,15" fill="var(--gold)" />
      <polygon points="18.5,17 17,18 18.5,19" fill="var(--gold)" />
    </svg>
  );
}

function IcoCross() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      {/* Left circle */}
      <circle cx="11" cy="15" r="9" fill="color-mix(in oklab, var(--have) 18%, transparent)" stroke="var(--have)" strokeWidth="1.3" />
      {/* Right circle */}
      <circle cx="19" cy="15" r="9" fill="color-mix(in oklab, var(--gold) 14%, transparent)" stroke="var(--gold)" strokeWidth="1.3" />
      {/* Intersection star */}
      <text x="15" y="18" textAnchor="middle" fontSize="8" fill="var(--gold-light)" fontWeight="700">✦</text>
    </svg>
  );
}

function IcoExport() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      {/* Device outline */}
      <rect x="4" y="6" width="15" height="20" rx="2.5" stroke="var(--gold)" strokeWidth="1.4" fill="color-mix(in oklab, var(--gold) 8%, transparent)" />
      {/* Screen lines */}
      <line x1="7" y1="11" x2="16" y2="11" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="7" y1="14" x2="14" y2="14" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      {/* Arrow out */}
      <line x1="22" y1="16" x2="28" y2="16" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="25" y1="12" x2="28" y2="16" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="25" y1="20" x2="28" y2="16" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Illustrations ──────────────────────────────────────────── */

function IlluGrid() {
  // Cards: [code, label, state]
  const cards: [string, string, "have" | "dup" | "miss"][] = [
    ["MEX1", "Team Photo",      "have"],
    ["MEX5", "H. Lozano",       "have"],
    ["KOR3", "Team Photo",      "miss"],
    ["CZE2", "T. Souček",       "have"],
    ["MEX8", "C. Ochoa",        "dup"],
    ["RSA4", "P. Zwane",        "have"],
    ["KOR7", "H. Son",          "miss"],
    ["CZE5", "V. Coufal",       "miss"],
    ["CAN3", "A. Davies",       "have"],
    ["SUI9", "G. Xhaka",        "dup"],
    ["BRA2", "Team Photo",      "have"],
    ["MAR6", "H. Ziyech",       "miss"],
  ];

  type State = "have" | "dup" | "miss";
  const cfg: Record<State, { bg: string; border: string; label: string; labelColor: string }> = {
    have: { bg: "color-mix(in oklab, var(--have) 14%, transparent)", border: "var(--have)",      label: "TENGO",    labelColor: "var(--have)" },
    dup:  { bg: "color-mix(in oklab, var(--dup)  14%, transparent)", border: "var(--dup)",       label: "×2",       labelColor: "var(--dup)" },
    miss: { bg: "rgba(255,255,255,0.025)",                            border: "var(--hairline-3)",label: "FALTA",    labelColor: "var(--ink-4)" },
  };

  const W = 52, H = 52, GAP = 8, COLS = 4;
  const totalW = COLS * W + (COLS - 1) * GAP;
  const offsetX = (260 - totalW) / 2;

  return (
    <svg viewBox="0 0 260 190" width="260" height="190" aria-hidden="true">
      {cards.map(([code, name, state], i) => {
        const col = i % COLS, row = Math.floor(i / COLS);
        const x = offsetX + col * (W + GAP);
        const y = 8 + row * (H + GAP);
        const c = cfg[state];
        return (
          <g key={i}>
            {/* Card body */}
            <rect x={x} y={y} width={W} height={H} rx="6" fill={c.bg} stroke={c.border} strokeWidth={state === "miss" ? 0.7 : 1.3} />
            {/* Top accent bar */}
            {state !== "miss" && <rect x={x} y={y} width={W} height="4" rx="3" fill={c.border} opacity="0.5" />}
            {/* Code */}
            <text x={x+5} y={y+15} fontSize="6.5" fill={state === "miss" ? "var(--ink-4)" : c.border} fontFamily="monospace" fontWeight="700">{code}</text>
            {/* Name line */}
            <text x={x+5} y={y+26} fontSize="6" fill={state === "miss" ? "var(--ink-4)" : "var(--ink-3)"} fontFamily="sans-serif"
              style={{ maxWidth: W - 10 }}>{name.length > 9 ? name.slice(0,9)+"…" : name}</text>
            {/* State indicator */}
            {state === "have" && (
              <g>
                <circle cx={x+W-10} cy={y+H-10} r="7" fill="var(--have)" opacity="0.9" />
                <path d={`M${x+W-13} ${y+H-10} l3 3 6-6`} stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
            {state === "dup" && (
              <g>
                <rect x={x+W-22} y={y+H-17} width="18" height="12" rx="3" fill="var(--dup)" opacity="0.9" />
                <text x={x+W-13} y={y+H-8} textAnchor="middle" fontSize="8" fill="#1a1408" fontFamily="monospace" fontWeight="800">×2</text>
              </g>
            )}
            {state === "miss" && (
              <text x={x+W/2} y={y+H-8} textAnchor="middle" fontSize="6" fill="var(--ink-4)" fontFamily="monospace" letterSpacing="1">- - -</text>
            )}
          </g>
        );
      })}
      {/* Legend */}
      {([
        { label: "TENGO",    color: "var(--have)",      x: 20 },
        { label: "REPETIDA", color: "var(--dup)",       x: 88 },
        { label: "FALTA",    color: "var(--ink-4)",     x: 172 },
      ] as {label:string;color:string;x:number}[]).map(l => (
        <g key={l.label}>
          <circle cx={l.x} cy="183" r="4" fill={l.color} />
          <text x={l.x+8} y="187" fontSize="8.5" fill="var(--ink-3)" fontFamily="monospace">{l.label}</text>
        </g>
      ))}
    </svg>
  );
}

function IlluClick() {
  return (
    <svg viewBox="0 0 260 180" width="260" height="180" aria-hidden="true">
      {/* Card 1: missing */}
      <rect x="18" y="30" width="62" height="110" rx="10" fill="rgba(255,255,255,0.04)" stroke="var(--hairline-3)" strokeWidth="1" />
      <line x1="34" y1="86" x2="66" y2="86" stroke="var(--hairline-3)" strokeWidth="2" strokeLinecap="round" />
      <text x="49" y="108" textAnchor="middle" fontSize="8" fill="var(--ink-4)" fontFamily="monospace">FALTA</text>

      {/* Arrow */}
      <text x="96" y="90" textAnchor="middle" fontSize="16" fill="var(--gold)">→</text>

      {/* Card 2: have */}
      <rect x="110" y="18" width="62" height="110" rx="10"
        fill="color-mix(in oklab, var(--have) 12%, transparent)"
        stroke="var(--have)" strokeWidth="1.5" />
      <path d="M128 76 l8 8 16-16" stroke="var(--have)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="141" y="105" textAnchor="middle" fontSize="8" fill="var(--have)" fontFamily="monospace">TENGO</text>

      {/* Arrow */}
      <text x="186" y="90" textAnchor="middle" fontSize="16" fill="var(--gold)">→</text>

      {/* Card 3: duplicate */}
      <rect x="198" y="30" width="46" height="82" rx="8"
        fill="color-mix(in oklab, var(--dup) 12%, transparent)"
        stroke="var(--dup)" strokeWidth="1.5" />
      <rect x="204" y="36" width="46" height="82" rx="8"
        fill="color-mix(in oklab, var(--dup) 10%, transparent)"
        stroke="var(--dup)" strokeWidth="1" opacity="0.6" />
      <text x="224" y="81" textAnchor="middle" fontSize="13" fill="var(--dup)" fontWeight="700" fontFamily="monospace">×2</text>
      <text x="224" y="100" textAnchor="middle" fontSize="7.5" fill="var(--dup)" fontFamily="monospace">REPETIDA</text>

      {/* Click hint */}
      <text x="130" y="148" textAnchor="middle" fontSize="9" fill="var(--ink-3)" fontFamily="monospace">CLICK IZQ. +1  ·  CLICK DER. −1</text>
    </svg>
  );
}

function IlluStats() {
  const pct = 62;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg viewBox="0 0 260 180" width="260" height="180" aria-hidden="true">
      {/* Ring */}
      <circle cx="80" cy="90" r={r} fill="none" stroke="var(--hairline-2)" strokeWidth="10" />
      <circle cx="80" cy="90" r={r} fill="none"
        stroke="var(--gold)" strokeWidth="10"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ / 4}
        strokeLinecap="round"
      />
      <text x="80" y="86" textAnchor="middle" fontSize="22" fill="var(--ink)" fontFamily="sans-serif" fontWeight="700">{pct}%</text>
      <text x="80" y="103" textAnchor="middle" fontSize="9" fill="var(--ink-3)" fontFamily="monospace">COMPLETADO</text>

      {/* Stats column */}
      <g transform="translate(156, 38)">
        {[
          { label: "TENGO",     value: "608", color: "var(--have)" },
          { label: "FALTAN",    value: "340", color: "var(--ink-2)" },
          { label: "REPETIDAS", value: "48",  color: "var(--dup)" },
        ].map((s, i) => (
          <g key={i} transform={`translate(0, ${i * 38})`}>
            <rect x="0" y="0" width="88" height="30" rx="6"
              fill={`color-mix(in oklab, ${s.color} 10%, transparent)`}
              stroke={`color-mix(in oklab, ${s.color} 25%, transparent)`} strokeWidth="1"
            />
            <text x="10" y="11" fontSize="7" fill="var(--ink-3)" fontFamily="monospace">{s.label}</text>
            <text x="10" y="24" fontSize="16" fill={s.color} fontFamily="sans-serif" fontWeight="700">{s.value}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function IlluSearch() {
  return (
    <svg viewBox="0 0 260 180" width="260" height="180" aria-hidden="true">
      {/* Search bar */}
      <rect x="14" y="14" width="232" height="34" rx="8" fill="var(--surface-2)" stroke="var(--gold)" strokeWidth="1.2" />
      <circle cx="35" cy="31" r="7" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" />
      <line x1="40" y1="36" x2="44" y2="40" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" />
      <text x="56" y="35" fontSize="11" fill="var(--ink-2)" fontFamily="sans-serif">Cristiano Ronaldo…</text>

      {/* Filter pills */}
      {[
        { label: "Todas 980", active: false, x: 14 },
        { label: "Tengo 608", active: true,  x: 86 },
        { label: "Faltan 340",active: false, x: 162 },
      ].map((p) => (
        <g key={p.label}>
          <rect x={p.x} y="60" width={p.active ? 68 : 72} height="26" rx="13"
            fill={p.active ? "color-mix(in oklab, var(--gold) 18%, transparent)" : "transparent"}
            stroke={p.active ? "var(--gold)" : "var(--hairline-3)"} strokeWidth="1"
          />
          <text x={p.x + (p.active ? 34 : 36)} y="77" textAnchor="middle" fontSize="9"
            fill={p.active ? "var(--gold)" : "var(--ink-3)"} fontFamily="monospace">{p.label}</text>
        </g>
      ))}

      {/* Group chips */}
      {["A","B","C","D","E","F","G","H"].map((g, i) => {
        const colors = ["var(--grp-a)","var(--grp-b)","var(--grp-c)","var(--grp-d)","var(--grp-e)","var(--grp-f)","var(--grp-g)","var(--grp-h)"];
        return (
          <g key={g}>
            <rect x={14 + i * 30} y="100" width="24" height="24" rx="6"
              fill={`color-mix(in oklab, ${colors[i]} 14%, transparent)`}
              stroke={colors[i]} strokeWidth="1"
            />
            <text x={26 + i * 30} y="116" textAnchor="middle" fontSize="10"
              fill={colors[i]} fontFamily="monospace" fontWeight="700">{g}</text>
          </g>
        );
      })}

      {/* Result row */}
      <rect x="14" y="140" width="232" height="28" rx="6" fill="var(--surface)" stroke="var(--hairline-2)" strokeWidth="1" />
      <rect x="20" y="148" width="34" height="12" rx="3" fill="color-mix(in oklab, var(--gold) 18%, transparent)" stroke="var(--gold)" strokeWidth="0.8" />
      <text x="37" y="157" textAnchor="middle" fontSize="7" fill="var(--gold)" fontFamily="monospace">POR15</text>
      <text x="64" y="157" fontSize="9" fill="var(--ink)" fontFamily="sans-serif">Cristiano Ronaldo</text>
      <path d="M220 152 l5 5 10-10" stroke="var(--have)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IlluTrade() {
  const stickers = ["KOR7","CZE2","CZE5","CAN3","CAN10","SUI9"];
  return (
    <svg viewBox="0 0 260 180" width="260" height="180" aria-hidden="true">
      <text x="14" y="20" fontSize="8" fill="var(--ink-3)" fontFamily="monospace" letterSpacing="2">TUS REPETIDAS</text>
      {stickers.map((code, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 14 + col * 80;
        const y = 28 + row * 52;
        return (
          <g key={code}>
            <rect x={x} y={y} width="70" height="42" rx="7"
              fill="color-mix(in oklab, var(--dup) 10%, transparent)"
              stroke="var(--dup)" strokeWidth="1"
            />
            <text x={x+8} y={y+15} fontSize="8" fill="var(--dup)" fontFamily="monospace" fontWeight="700">{code}</text>
            <text x={x+8} y={y+28} fontSize="7" fill="var(--ink-3)" fontFamily="monospace">×1 extra</text>
          </g>
        );
      })}
      {/* Copy button */}
      <rect x="72" y="148" width="116" height="26" rx="6"
        fill="color-mix(in oklab, var(--gold) 12%, transparent)"
        stroke="var(--gold)" strokeWidth="1.2"
      />
      <text x="130" y="165" textAnchor="middle" fontSize="9" fill="var(--gold)" fontFamily="monospace">📋  COPIAR LISTA</text>
    </svg>
  );
}

function IlluCross() {
  return (
    <svg viewBox="0 0 260 180" width="260" height="180" aria-hidden="true">
      {/* Left circle — me */}
      <circle cx="95" cy="85" r="60" fill="color-mix(in oklab, var(--have) 10%, transparent)" stroke="var(--have)" strokeWidth="1.5" opacity="0.9" />
      <text x="60" y="55" fontSize="8" fill="var(--have)" fontFamily="monospace" fontWeight="700">YO</text>
      <text x="52" y="68" fontSize="7" fill="var(--ink-3)" fontFamily="monospace">8 repetidas</text>

      {/* Right circle — partner */}
      <circle cx="165" cy="85" r="60" fill="color-mix(in oklab, var(--gold) 10%, transparent)" stroke="var(--gold)" strokeWidth="1.5" opacity="0.9" />
      <text x="182" y="55" fontSize="8" fill="var(--gold)" fontFamily="monospace" fontWeight="700">COMPAÑERO</text>
      <text x="176" y="68" fontSize="7" fill="var(--ink-3)" fontFamily="monospace">78 rept.</text>

      {/* Intersection label */}
      <text x="130" y="78" textAnchor="middle" fontSize="18" fill="var(--ink)" fontWeight="700" fontFamily="sans-serif">77</text>
      <text x="130" y="93" textAnchor="middle" fontSize="7.5" fill="var(--ink-2)" fontFamily="monospace">MATCHES</text>

      {/* Arrows */}
      <path d="M108 120 Q130 134 152 120" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arr)" />
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--gold)" />
        </marker>
      </defs>

      {/* Bottom tags */}
      <rect x="14" y="154" width="86" height="20" rx="4" fill="color-mix(in oklab, var(--have) 14%, transparent)" stroke="var(--have)" strokeWidth="1" />
      <text x="57" y="168" textAnchor="middle" fontSize="8" fill="var(--have)" fontFamily="monospace">▼ PUEDO RECIBIR</text>

      <rect x="160" y="154" width="86" height="20" rx="4" fill="color-mix(in oklab, var(--gold) 12%, transparent)" stroke="var(--gold)" strokeWidth="1" />
      <text x="203" y="168" textAnchor="middle" fontSize="8" fill="var(--gold)" fontFamily="monospace">▲ PUEDO DAR</text>
    </svg>
  );
}

function IlluExport() {
  return (
    <svg viewBox="0 0 260 180" width="260" height="180" aria-hidden="true">
      {/* Phone A */}
      <rect x="22" y="20" width="70" height="120" rx="10" fill="var(--surface)" stroke="var(--hairline)" strokeWidth="1.2" />
      <rect x="30" y="35" width="54" height="8" rx="3" fill="var(--hairline-2)" />
      <rect x="30" y="49" width="38" height="6" rx="3" fill="var(--hairline-2)" />
      {[0,1,2].map(i => (
        <rect key={i} x="30" y={62 + i*14} width="54" height="10" rx="3"
          fill={i === 0 ? "color-mix(in oklab, var(--have) 18%, transparent)" : "var(--hairline-2)"}
          stroke={i === 0 ? "var(--have)" : "none"} strokeWidth="0.8"
        />
      ))}
      <text x="57" y="152" textAnchor="middle" fontSize="7" fill="var(--ink-3)" fontFamily="monospace">MI ÁLBUM</text>

      {/* Arrow with JSON */}
      <rect x="108" y="76" width="44" height="20" rx="5" fill="var(--gold-bg)" stroke="var(--gold)" strokeWidth="1" />
      <text x="130" y="90" textAnchor="middle" fontSize="8" fill="var(--gold)" fontFamily="monospace">JSON</text>
      <line x1="96" y1="86" x2="108" y2="86" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="152" y1="86" x2="164" y2="86" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="162,82 168,86 162,90" fill="var(--gold)" />

      {/* Phone B */}
      <rect x="168" y="20" width="70" height="120" rx="10" fill="var(--surface)" stroke="var(--hairline)" strokeWidth="1.2" />
      <rect x="176" y="35" width="54" height="8" rx="3" fill="var(--hairline-2)" />
      <rect x="176" y="49" width="38" height="6" rx="3" fill="var(--hairline-2)" />
      {[0,1,2].map(i => (
        <rect key={i} x="176" y={62 + i*14} width="54" height="10" rx="3"
          fill={i < 2 ? "color-mix(in oklab, var(--have) 18%, transparent)" : "var(--hairline-2)"}
          stroke={i < 2 ? "var(--have)" : "none"} strokeWidth="0.8"
        />
      ))}
      <text x="203" y="152" textAnchor="middle" fontSize="7" fill="var(--ink-3)" fontFamily="monospace">COMPAÑERO</text>
    </svg>
  );
}

/* ─── Step data ──────────────────────────────────────────────── */

interface Step {
  icon: React.ReactNode;
  title: string;
  desc: string;
  benefit: string;
  illu: React.ReactNode;
}

function getSteps(lang: "es" | "en"): Step[] {
  if (lang === "es") return [
    {
      icon: <IcoAlbum />,
      title: "Tu álbum completo, digital",
      desc: "Las 980 figuritas del Mundial 2026 organizadas exactamente igual que el álbum físico: sección de introducción, 48 selecciones agrupadas por grupo, e historia del torneo.",
      benefit: "Sin papel, sin perder la cuenta",
      illu: <IlluGrid />,
    },
    {
      icon: <IcoClick />,
      title: "Registra con un click",
      desc: "Click izquierdo para sumar una figurita. Click derecho o Shift+click para restar. Si es la primera vez que la consigues, verás una animación de celebración.",
      benefit: "Tan rápido como abrir un sobre",
      illu: <IlluClick />,
    },
    {
      icon: <IcoProgress />,
      title: "Progreso en tiempo real",
      desc: "Panel de estadísticas siempre visible: cuántas tienes, cuántas faltan, cuántas repetidas, y el porcentaje de completado. Tres modos de visualización para tu gusto.",
      benefit: "Sabe exactamente dónde estás",
      illu: <IlluStats />,
    },
    {
      icon: <IcoSearch />,
      title: "Busca y filtra al instante",
      desc: "Busca cualquier jugador, código o selección. Filtra por estado: todas, las que tienes, las que faltan, o las repetidas. También por grupo (A–L) del torneo.",
      benefit: "Encuentra cualquier figurita en segundos",
      illu: <IlluSearch />,
    },
    {
      icon: <IcoTrade />,
      title: "Lista de intercambio",
      desc: "Tu lista de repetidas generada automáticamente. Cópiala con un botón para compartirla por WhatsApp, Telegram o donde quieras.",
      benefit: "Comparte tus repetidas en un toque",
      illu: <IlluTrade />,
    },
    {
      icon: <IcoCross />,
      title: "Cruce de álbumes",
      desc: "Carga el JSON de tu compañero y en segundos ves qué figuritas puedes recibir de él y cuáles puedes darle. Selecciona las que quieres intercambiar y da click en Proceder — tu inventario se actualiza solo.",
      benefit: "Intercambios perfectos, sin confusión",
      illu: <IlluCross />,
    },
    {
      icon: <IcoExport />,
      title: "Exporta e importa tu álbum",
      desc: "Todo se guarda automáticamente en tu dispositivo. Exporta un archivo JSON para hacer backup o para compartir tu estado con alguien más. Sin cuenta, sin servidor, sin perder nada.",
      benefit: "Tus datos, siempre contigo",
      illu: <IlluExport />,
    },
  ];

  return [
    {
      icon: <IcoAlbum />,
      title: "Your full album, digital",
      desc: "All 980 stickers from World Cup 2026 organized exactly like the physical album: intro section, 48 teams grouped by group, and tournament history.",
      benefit: "No paper, no losing count",
      illu: <IlluGrid />,
    },
    {
      icon: <IcoClick />,
      title: "Register with one click",
      desc: "Left-click to add a sticker. Right-click or Shift+click to remove one. If it's your first time collecting it, you'll see a celebration animation.",
      benefit: "As fast as opening a pack",
      illu: <IlluClick />,
    },
    {
      icon: <IcoProgress />,
      title: "Real-time progress",
      desc: "Stats panel always visible: how many you have, how many are missing, duplicates, and completion percentage. Three visualization modes to choose from.",
      benefit: "Always know exactly where you stand",
      illu: <IlluStats />,
    },
    {
      icon: <IcoSearch />,
      title: "Search and filter instantly",
      desc: "Search any player, code or team. Filter by status: all, have, missing, or duplicates. Also filter by tournament group (A–L).",
      benefit: "Find any sticker in seconds",
      illu: <IlluSearch />,
    },
    {
      icon: <IcoTrade />,
      title: "Trade list",
      desc: "Your duplicate list generated automatically. Copy it with one button to share via WhatsApp, Telegram or wherever you want.",
      benefit: "Share your duplicates in one tap",
      illu: <IlluTrade />,
    },
    {
      icon: <IcoCross />,
      title: "Album cross-match",
      desc: "Load your friend's JSON and instantly see which stickers you can receive from them and which you can give. Select the ones you want to trade and click Proceed — your inventory updates automatically.",
      benefit: "Perfect trades, zero confusion",
      illu: <IlluCross />,
    },
    {
      icon: <IcoExport />,
      title: "Export & import your album",
      desc: "Everything saves automatically on your device. Export a JSON file to back up or share your state with someone else. No account, no server, nothing lost.",
      benefit: "Your data, always with you",
      illu: <IlluExport />,
    },
  ];
}

/* ─── Modal ──────────────────────────────────────────────────── */

interface ModalProps {
  lang: Language;
  onClose: () => void;
}

function HowItWorksModal({ lang, onClose }: ModalProps) {
  const steps = getSteps(lang);
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const isLast = current === steps.length - 1;

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && current < steps.length - 1) setCurrent((c) => c + 1);
      if (e.key === "ArrowLeft" && current > 0) setCurrent((c) => c - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, onClose, steps.length]);

  const label = (s: "prev" | "next" | "close" | "start") => ({
    prev:  lang === "es" ? "← Anterior" : "← Previous",
    next:  lang === "es" ? "Siguiente →" : "Next →",
    close: lang === "es" ? "Cerrar" : "Close",
    start: lang === "es" ? "¡Empezar! →" : "Let's go! →",
  }[s]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          width: "100%", maxWidth: 560,
          background: "var(--surface)",
          border: "1px solid var(--hairline)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* ── Top bar ── */}
        <div style={{
          padding: "14px 20px",
          borderBottom: "1px solid var(--hairline-2)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-mono, monospace)" }}>
            {lang === "es" ? "¿Cómo funciona?" : "How it works"}
          </span>
          <button onClick={onClose} style={{ background: "transparent", border: 0, color: "var(--ink-3)", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 4 }} aria-label="Close">✕</button>
        </div>

        {/* ── Illustration ── */}
        <div style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--hairline-2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px 20px 20px",
          minHeight: 200,
        }}>
          {step.illu}
        </div>

        {/* ── Content ── */}
        <div style={{ padding: "24px 24px 20px", flex: 1 }}>
          {/* Step icon + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>{step.icon}</span>
            <h2 style={{
              margin: 0, fontSize: 20, lineHeight: 1.15,
              fontFamily: "var(--font-display, sans-serif)",
              color: "var(--ink)", letterSpacing: "0.01em",
            }}>
              {step.title}
            </h2>
          </div>

          {/* Description */}
          <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.65 }}>
            {step.desc}
          </p>

          {/* Benefit pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 14px",
            background: "color-mix(in oklab, var(--gold) 10%, transparent)",
            border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
            borderRadius: 999,
          }}>
            <span style={{ fontSize: 11, color: "var(--gold)", lineHeight: 1 }}>✦</span>
            <span style={{ fontSize: 12, color: "var(--gold-light)", fontStyle: "italic", fontFamily: "var(--font-serif, Georgia, serif)" }}>
              {step.benefit}
            </span>
          </div>
        </div>

        {/* ── Footer: dots + nav ── */}
        <div style={{
          padding: "14px 24px 18px",
          borderTop: "1px solid var(--hairline-2)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        }}>
          {/* Dots */}
          <div style={{ display: "flex", gap: 6 }}>
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 20 : 7,
                  height: 7,
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                  background: i === current ? "var(--gold)" : "var(--hairline-3)",
                  transition: "width 0.25s ease, background 0.2s",
                  padding: 0,
                }}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>

          {/* Nav buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            {current > 0 && (
              <button
                onClick={() => setCurrent((c) => c - 1)}
                className="btn-ghost"
                style={{ fontSize: 11, color: "var(--ink-3)" }}
              >
                {label("prev")}
              </button>
            )}
            {isLast ? (
              <button
                onClick={onClose}
                style={{
                  padding: "8px 20px",
                  background: "var(--gold)",
                  color: "#1a1408",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {label("start")}
              </button>
            ) : (
              <button
                onClick={() => setCurrent((c) => c + 1)}
                style={{
                  padding: "8px 20px",
                  background: "var(--gold)",
                  color: "#1a1408",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {label("next")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Public component ───────────────────────────────────────── */

export default function HowItWorks({ lang }: { lang: Language }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="how-it-works-btn"
        aria-label={lang === "es" ? "¿Cómo funciona?" : "How it works"}
      >
        <span className="how-it-works-icon">?</span>
        <span className="how-it-works-label">
          {lang === "es" ? "¿Cómo funciona?" : "How it works"}
        </span>
      </button>

      {open && typeof document !== "undefined" &&
        createPortal(
          <HowItWorksModal lang={lang} onClose={() => setOpen(false)} />,
          document.body
        )
      }
    </>
  );
}
