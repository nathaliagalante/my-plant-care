import { Trash2 } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"
import WaterBadge from "../WaterBadge/WaterBadge"

export default function PlantListRow({ plant, onRemove, last }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, padding: "12px 20px",
      borderBottom: last ? "none" : `1px solid ${COLOR.borderLight}`,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, overflow: "hidden",
        flexShrink: 0, background: COLOR.green5,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {plant.image
          ? <img src={plant.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ fontSize: 22 }}>{plant.icon}</span>
        }
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: COLOR.text1 }}>{plant.name}</p>
        <p style={{ fontSize: 12, color: COLOR.text3 }}>{plant.common}</p>
      </div>

      <WaterBadge value={plant.nextWatering || plant.water} isUrgent={plant.isUrgent} />

      <button
        onClick={() => onRemove(plant.id)}
        aria-label={`Remove ${plant.name}`}
        style={{
          padding: 6, borderRadius: 8, border: "none",
          background: "transparent", color: COLOR.text3,
          display: "flex", transition: "all 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = COLOR.terraLight; e.currentTarget.style.color = COLOR.terra }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLOR.text3 }}
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}