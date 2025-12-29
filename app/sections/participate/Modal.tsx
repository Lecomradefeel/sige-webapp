"use client";

import { useEffect } from "react";

export default function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 18,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "min(940px, 100%)",
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "rgba(10,10,10,0.92)",
          boxShadow: "0 30px 120px rgba(0,0,0,0.8)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <div style={{ fontWeight: 900 }}>{title}</div>
          <button
            onClick={onClose}
            style={{
              border: "1px solid rgba(255,255,255,0.16)",
              background: "transparent",
              color: "inherit",
              borderRadius: 12,
              padding: "8px 10px",
              cursor: "pointer",
            }}
          >
            Chiudi
          </button>
        </div>
        <div style={{ padding: 16 }}>{children}</div>
      </div>
    </div>
  );
}
