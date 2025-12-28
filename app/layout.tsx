import "./globals.css";

export const metadata = {
  title: "Sinistra Italiana · Genova",
  description:
    "Diritti, territorio, lavoro. Una politica utile, concreta, partecipata.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Inter, Helvetica, Arial, sans-serif",
          background: "#000",
          color: "#fff",
        }}
      >
        {/* HEADER */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <strong>Sinistra Italiana · Genova</strong>

            <nav
              style={{
                display: "flex",
                gap: 18,
                fontSize: 14,
                opacity: 0.9,
              }}
            >
              <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </a>
              <a
                href="/news"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Notizie
              </a>
              <a
                href="/agenda"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Agenda
              </a>
              <a
                href="/azioni"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Azioni
              </a>
              <a
                href="/sostieni"
                style={{
                  color: "#000",
                  background: "#fff",
                  padding: "6px 10px",
                  borderRadius: 10,
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Sostieni
              </a>
            </nav>
          </div>
        </header>

        {/* CONTENUTO */}
        {children}

        {/* FOOTER */}
        <footer
          style={{
            marginTop: 80,
            padding: "40px 20px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            opacity: 0.8,
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto", fontSize: 14 }}>
            © {new Date().getFullYear()} Sinistra Italiana · Genova
          </div>
        </footer>
      </body>
    </html>
  );
}
