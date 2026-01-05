"use client";

import Modal from "@/app/components/ui/Modal";
import type { EventItem } from "./types";

export default function ParticipateCalendarModal({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: EventItem[];
}) {
  return (
    <Modal open={open} onClose={onClose} title="Tutti gli eventi (mese corrente)">
      <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 12 }}>
        Qui metteremo il calendario mensile. Intanto elenco eventi:
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {items.map((e) => (
          <div
            key={e.id}
            style={{
              padding: 12,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <div style={{ fontWeight: 900 }}>{e.title}</div>
            {e.dateText ? (
              <div style={{ fontSize: 13, opacity: 0.8 }}>{e.dateText}</div>
            ) : null}
          </div>
        ))}
      </div>
    </Modal>
  );
}
