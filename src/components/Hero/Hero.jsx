import { Plus } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"

export default function Hero({ plantCount, onAdd }) {
  return (
    <div className="hero">
    <div>
      <h1 style={{
        maxWidth: 320, fontSize: "clamp(2.5rem, 5vw, 3rem)", fontWeight: 700,
        letterSpacing: "-0.04em", color: COLOR.text1, lineHeight: 0.98,
      }}>
        Digital Conservatory
      </h1>
      <p style={{ fontSize: 12, color: COLOR.text2, marginTop: 8 }}>
        {plantCount} {plantCount === 1 ? "plant" : "plants"} in your garden
        </p>
      </div>

      <button
        onClick={onAdd}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          background: COLOR.green2, color: "#fff", border: "none",
          borderRadius: 100, padding: "10px 18px",
          fontSize: 12, fontWeight: 700, flexShrink: 0,
          transition: "background 0.15s, transform 0.1s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = COLOR.green1}
        onMouseLeave={e => e.currentTarget.style.background = COLOR.green2}
        onMouseDown={e  => e.currentTarget.style.transform  = "scale(0.97)"}
        onMouseUp={e   => e.currentTarget.style.transform  = "scale(1)"}
      >
        <Plus size={17} strokeWidth={2.5} />
        Add Plant
      </button>
    </div>
  )
}