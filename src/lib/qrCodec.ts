/**
 * QR encode/decode for album state.
 *
 * Format:  PANINI2026:<base64>
 *
 * The base64 payload encodes a Uint8Array of exactly `allStickers.length`
 * bytes.  Byte[i] = count of sticker at allStickers[i] (clamped 0-255).
 * This produces ≈980 bytes → ≈1308 base64 chars, well within QR limits.
 */

import { AlbumState } from "@/types";
import { allStickers } from "@/data/stickers";

const PREFIX = "PANINI2026:";

export function encodeAlbumToQR(state: AlbumState): string {
  const bytes = new Uint8Array(allStickers.length);
  for (let i = 0; i < allStickers.length; i++) {
    bytes[i] = Math.min(state[allStickers[i].id] ?? 0, 255);
  }
  // btoa needs a binary string
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return PREFIX + btoa(bin);
}

export function decodeQRToAlbum(raw: string): AlbumState | null {
  if (!raw.startsWith(PREFIX)) return null;
  try {
    const bin = atob(raw.slice(PREFIX.length));
    const state: AlbumState = {};
    for (let i = 0; i < allStickers.length && i < bin.length; i++) {
      const count = bin.charCodeAt(i);
      if (count > 0) state[allStickers[i].id] = count;
    }
    return state;
  } catch {
    return null;
  }
}
