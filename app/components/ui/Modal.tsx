"use client";

import * as React from "react";
import { useEffect } from "react";
import { useLockBodyScroll } from "@/app/components/hooks/useLockBodyScroll";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useLockBodyScroll(open);

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
      onMouseDown={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(8,0,3,0.6)",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "min(920px, 100%)",
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(34,0,8,0.78)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          color: "#fff",
          padding: 18,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>{title ?? ""}</div>

          <button
            onClick={onClose}
            style={{
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: 12,
              padding: "6px 10px",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            Chiudi
          </button>
        </div>

        <div style={{ marginTop: 14 }}>{children}</div>
      </div>
    </div>
  );
}
