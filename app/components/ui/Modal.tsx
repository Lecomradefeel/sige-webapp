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
      className="modal-overlay"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="modal-panel"
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div className="modal-title">{title ?? ""}</div>

          <button
            onClick={onClose}
            style={{
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.08)",
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
