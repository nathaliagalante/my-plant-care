import { Plus } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"

export default function Hero({ plantCount, onAdd }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      gap: 16, marginBottom: "2rem",
    }}>
      <div>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
          textTransform: "uppercase", color: COLOR.green3, marginBottom: 4,
        }}>
          Diário do Arquivista
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600,
          color: COLOR.text1, lineHeight: 1.1,
        }}>
          Conservatório Digital
        </h1>
        <p style={{ fontSize: 13, color: COLOR.text3, marginTop: 6 }}>
          {plantCount} planta{plantCount !== 1 ? "s" : ""} no seu jardim
        </p>
      </div>

      <button
        onClick={onAdd}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          background: COLOR.green2, color: "#fff", border: "none",
          borderRadius: 12, padding: "11px 20px",
          fontSize: 14, fontWeight: 600, flexShrink: 0,
          transition: "background 0.15s, transform 0.1s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = COLOR.green1}
        onMouseLeave={e => e.currentTarget.style.background = COLOR.green2}
        onMouseDown={e  => e.currentTarget.style.transform  = "scale(0.97)"}
        onSignUp={e    => e.currentTarget.style.transform  = "scale(1)"}
      >
        <Plus size={17} strokeWidth={2.5} />
        Adicionar Planta
      </button>
    </div>
  )
}