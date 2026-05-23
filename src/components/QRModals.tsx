"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import jsQR from "jsqr";
import { AlbumState, Language } from "@/types";
import { encodeAlbumToQR, decodeQRToAlbum } from "@/lib/qrCodec";

/* ── shared overlay shell ─────────────────────────────────────── */

function ModalShell({
  title,
  onClose,
  children,
  maxWidth = 400,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 210,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: "100%",
          maxWidth,
          background: "var(--surface)",
          border: "1px solid var(--hairline)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.65)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid var(--hairline-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 9.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: 0,
              color: "var(--ink-3)",
              cursor: "pointer",
              fontSize: 18,
              padding: 4,
              lineHeight: 1,
            }}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── QR Display modal ─────────────────────────────────────────── */

export function QRDisplayModal({
  state,
  lang,
  onClose,
}: {
  state: AlbumState;
  lang: Language;
  onClose: () => void;
}) {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const encoded = encodeAlbumToQR(state);
    QRCode.toDataURL(encoded, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 280,
      color: {
        dark: "#1a1408",
        light: "#f5ede0",
      },
    }).then(setDataUrl);
  }, [state]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "album-panini-2026-qr.png";
    a.click();
  };

  const handleCopyText = async () => {
    const encoded = encodeAlbumToQR(state);
    try {
      await navigator.clipboard.writeText(encoded);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <ModalShell
      title={lang === "es" ? "Mi código QR" : "My QR code"}
      onClose={onClose}
    >
      <div style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {/* QR image */}
        <div
          style={{
            borderRadius: "var(--radius)",
            overflow: "hidden",
            border: "1px solid var(--hairline-2)",
            background: "#f5ede0",
            width: 280,
            height: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {dataUrl ? (
            <img src={dataUrl} alt="QR álbum" width={280} height={280} style={{ display: "block" }} />
          ) : (
            <span
              className="font-mono"
              style={{ fontSize: 10, color: "#888", letterSpacing: "0.15em" }}
            >
              {lang === "es" ? "GENERANDO…" : "GENERATING…"}
            </span>
          )}
        </div>

        {/* Instructions */}
        <p
          className="font-serif"
          style={{ fontSize: 13, fontStyle: "italic", color: "var(--ink-3)", textAlign: "center", margin: 0, lineHeight: 1.5 }}
        >
          {lang === "es"
            ? "Muéstrale este QR a tu compañero para que escanee tu álbum y calcule el intercambio."
            : "Show this QR to your partner so they can scan your album and calculate the trade."}
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={handleDownload}
            disabled={!dataUrl}
            className="btn-ghost"
            style={{ fontSize: 11 }}
          >
            ↓ {lang === "es" ? "Descargar imagen" : "Download image"}
          </button>
          <button
            onClick={handleCopyText}
            className="btn-ghost"
            style={{ fontSize: 11, color: copied ? "var(--have)" : undefined }}
          >
            {copied ? "✓ Copiado" : "⌘ Copy código"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

/* ── QR Scanner modal ─────────────────────────────────────────── */

type ScanState = "requesting" | "scanning" | "error" | "success";

export function QRScanModal({
  lang,
  onScanned,
  onClose,
}: {
  lang: Language;
  onScanned: (state: AlbumState) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const activeRef = useRef(true);

  const [scanState, setScanState] = useState<ScanState>("requesting");
  const [errorMsg, setErrorMsg] = useState("");
  const [hint, setHint] = useState("");

  // Manual paste fallback
  const [pasteText, setPasteText] = useState("");
  const [showPaste, setShowPaste] = useState(false);

  const stopCamera = useCallback(() => {
    activeRef.current = false;
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const handleClose = useCallback(() => {
    stopCamera();
    onClose();
  }, [stopCamera, onClose]);

  const processQRData = useCallback(
    (raw: string) => {
      const album = decodeQRToAlbum(raw);
      if (!album) {
        setHint(lang === "es" ? "QR no reconocido. ¿Es un álbum Panini 2026?" : "QR not recognized. Is this a Panini 2026 album?");
        return false;
      }
      setScanState("success");
      stopCamera();
      setTimeout(() => {
        onScanned(album);
        onClose();
      }, 600);
      return true;
    },
    [lang, onScanned, onClose, stopCamera]
  );

  useEffect(() => {
    activeRef.current = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 640 } },
        });
        if (!activeRef.current) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        const video = videoRef.current!;
        video.srcObject = stream;
        await video.play();
        setScanState("scanning");

        const scan = () => {
          if (!activeRef.current) return;
          const v = videoRef.current;
          const c = canvasRef.current;
          if (v && c && v.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && v.videoWidth > 0) {
            c.width = v.videoWidth;
            c.height = v.videoHeight;
            const ctx = c.getContext("2d", { willReadFrequently: true });
            if (ctx) {
              ctx.drawImage(v, 0, 0);
              const img = ctx.getImageData(0, 0, c.width, c.height);
              const code = jsQR(img.data, img.width, img.height, {
                inversionAttempts: "dontInvert",
              });
              if (code?.data) {
                if (!processQRData(code.data)) {
                  // keep scanning
                  rafRef.current = requestAnimationFrame(scan);
                }
                return;
              }
            }
          }
          rafRef.current = requestAnimationFrame(scan);
        };

        rafRef.current = requestAnimationFrame(scan);
      } catch (err: unknown) {
        if (!activeRef.current) return;
        setScanState("error");
        const msg = err instanceof Error ? err.message : String(err);
        setErrorMsg(
          msg.includes("NotAllowed") || msg.includes("Permission")
            ? lang === "es"
              ? "Permiso de cámara denegado."
              : "Camera permission denied."
            : lang === "es"
            ? "No se pudo acceder a la cámara."
            : "Could not access the camera."
        );
        setShowPaste(true);
      }
    };

    startCamera();
    return () => { stopCamera(); };
  }, [lang, processQRData, stopCamera]);

  const handlePasteSubmit = () => {
    if (!processQRData(pasteText.trim())) {
      setHint(lang === "es" ? "Código no válido." : "Invalid code.");
    }
  };

  return (
    <ModalShell
      title={lang === "es" ? "Escanear álbum" : "Scan album"}
      onClose={handleClose}
      maxWidth={420}
    >
      <div style={{ padding: "20px 20px 18px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Camera view */}
        {(scanState === "scanning" || scanState === "requesting") && (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1",
              background: "#000",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              border: "1px solid var(--hairline-2)",
            }}
          >
            <video
              ref={videoRef}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              playsInline
              muted
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />

            {/* Scan frame overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: "60%",
                  aspectRatio: "1",
                  border: "2px solid var(--gold)",
                  borderRadius: 8,
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.35)",
                }}
              />
            </div>

            {scanState === "requesting" && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.6)",
                }}
              >
                <span className="font-mono" style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.2em" }}>
                  {lang === "es" ? "INICIANDO CÁMARA…" : "STARTING CAMERA…"}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Success state */}
        {scanState === "success" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "32px 0",
            }}
          >
            <span style={{ fontSize: 40, lineHeight: 1 }}>✓</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, color: "var(--have)", letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              {lang === "es" ? "¡QR detectado!" : "QR detected!"}
            </span>
          </div>
        )}

        {/* Error state */}
        {scanState === "error" && (
          <div
            style={{
              padding: "20px 0 8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 28 }}>📷</span>
            <p style={{ fontSize: 13, color: "#f87171", textAlign: "center", margin: 0 }}>{errorMsg}</p>
          </div>
        )}

        {/* Scan hint */}
        {hint && (
          <p style={{ fontSize: 11, color: "var(--gold)", textAlign: "center", margin: 0 }}>{hint}</p>
        )}

        {/* Instruction */}
        {scanState === "scanning" && (
          <p
            className="font-serif"
            style={{ fontSize: 12.5, fontStyle: "italic", color: "var(--ink-3)", textAlign: "center", margin: 0 }}
          >
            {lang === "es"
              ? "Apunta la cámara al QR del álbum de tu compañero."
              : "Point the camera at your partner's album QR code."}
          </p>
        )}

        {/* Paste fallback */}
        <div style={{ marginTop: 4 }}>
          {!showPaste ? (
            <button
              onClick={() => setShowPaste(true)}
              className="btn-ghost"
              style={{ fontSize: 10, color: "var(--ink-3)", width: "100%" }}
            >
              {lang === "es" ? "¿Sin cámara? Pega el código de texto" : "No camera? Paste text code"}
            </button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <textarea
                placeholder={lang === "es" ? "Pega el código PANINI2026:… aquí" : "Paste PANINI2026:… code here"}
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  resize: "vertical",
                  background: "var(--surface-2)",
                  border: "1px solid var(--hairline-2)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--ink)",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: 10,
                  padding: "8px 10px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={handlePasteSubmit}
                disabled={!pasteText.trim()}
                style={{
                  padding: "7px 16px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--gold)",
                  background: "var(--gold)",
                  color: "#1a1408",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: pasteText.trim() ? "pointer" : "not-allowed",
                  opacity: pasteText.trim() ? 1 : 0.5,
                }}
              >
                {lang === "es" ? "Cargar" : "Load"}
              </button>
            </div>
          )}
        </div>

        <button onClick={handleClose} className="btn-ghost" style={{ fontSize: 11, color: "var(--ink-3)" }}>
          {lang === "es" ? "Cancelar" : "Cancel"}
        </button>
      </div>
    </ModalShell>
  );
}
