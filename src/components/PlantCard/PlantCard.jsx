import { useState } from "react"
import { Trash2 } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"
import WaterBadge from "../WaterBadge/WaterBadge"

export default function PlantCard({ plant, onRemove, delay }) {
  const [hovered, setHovered] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const placeholderColors = ["var(--color-lavender-soft)", "var(--color-mint)", "var(--color-pink)"]
  const placeholderColor = placeholderColors[Math.floor(delay / 50) % placeholderColors.length]

  return (
    <div
      className="anim-fadeUp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${delay}ms`,
        background: "transparent", borderRadius: 14, overflow: "visible",
        transition: "transform 0.2s",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      <div style={{
        aspectRatio: "1 / 1", overflow: "hidden", borderRadius: 14,
        position: "relative", background: placeholderColor,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {plant.image && !imageFailed ? (
          <img
            src={plant.image} alt={plant.name}
            onError={() => setImageFailed(true)}
            style={{
              width: "76%", height: "76%", objectFit: "contain",
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%", background: placeholderColor,
            display: "flex", alignItems: "flex-end", padding: 10,
            fontSize: 12, color: COLOR.text1,
          }}>
            Plant photo
          </div>
        )}
        <button
          className="plant-remove"
          onClick={() => onRemove(plant.id)}
          aria-label={`Remove ${plant.name}`}
          style={{
            position: "absolute", top: 8, right: 8, padding: 7,
            borderRadius: 100, border: "none", background: "rgba(255,255,255,0.88)",
            color: COLOR.text2, display: "flex",
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div style={{
        padding: "9px 0 0",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8,
      }}>
        <div style={{ minWidth: 0 }}>
          <p style={{
            fontSize: 14, fontWeight: 700, color: COLOR.text1, marginBottom: 4,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {plant.name}
          </p>
          <p style={{ fontSize: 12, color: COLOR.text3, marginBottom: 5 }}>{plant.commonName || plant.common}</p>
          {plant.wateringDays && plant.wateringUnit && (
            <WaterBadge wateringDays={plant.wateringDays} wateringUnit={plant.wateringUnit} isUrgent={plant.isUrgent} />
          )}
        </div>
      </div>
    </div>
  )
}