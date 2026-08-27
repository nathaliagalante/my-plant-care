import { useState } from "react"
import { Trash2 } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"
import WaterBadge from "../WaterBadge/WaterBadge"

export default function PlantCard({ plant, onRemove, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="anim-fadeUp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${delay}ms`,
        background: COLOR.surface, borderRadius: 18, overflow: "hidden",
        border: `1px solid ${hovered ? COLOR.green4 : COLOR.border}`,
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform:  hovered ? "translateY(-4px)" : "none",
        boxShadow:  hovered ? "0 8px 28px rgba(30,58,14,0.12)" : "none",
      }}
    >
      <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
        {plant.image ? (
          <img
            src={plant.image} alt={plant.name}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%", background: COLOR.green5,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 52,
          }}>
            {plant.icon}
          </div>
        )}
      </div>

      <div style={{
        padding: "12px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
      }}>
        <div style={{ minWidth: 0 }}>
          <p style={{
            fontSize: 14, fontWeight: 700, color: COLOR.text1, marginBottom: 6,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {plant.name}
          </p>
          <p style={{ fontSize: 11, color: COLOR.text3, marginBottom: 6 }}>{plant.common}</p>
          <WaterBadge value={plant.nextWatering || plant.water} isUrgent={plant.isUrgent} />
        </div>

        <button
          onClick={() => onRemove(plant.id)}
          aria-label={`Remover ${plant.name}`}
          style={{
            flexShrink: 0, padding: 6, borderRadius: 8,
            border: "none", background: "transparent", color: COLOR.text3,
            display: "flex", transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = COLOR.terraLight; e.currentTarget.style.color = COLOR.terra }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLOR.text3 }}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}