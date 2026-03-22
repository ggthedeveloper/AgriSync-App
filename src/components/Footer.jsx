import { I } from "./Icons";

export default function Footer({ th }) {
  return (
    <div
      style={{
        marginTop: 30,
        padding: "14px 16px",
        borderTop: `1px solid ${th.br}`,
        background: th.sf,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 13, color: th.sub }}>
        © {new Date().getFullYear()} AgriSync · Built by GG with ❤️ for Farmers
      </div>

      <div style={{ marginTop: 6, display: "flex", justifyContent: "center", gap: 10 }}>
        <I n="leaf" size={14} color={th.ac} />
        <span style={{ fontSize: 12, color: th.sub }}>
          Smart Farming Assistant
        </span>
      </div>
    </div>
  );
}``