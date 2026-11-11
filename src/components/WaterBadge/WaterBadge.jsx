import { Droplets } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"

export default function WaterBadge({ wateringDays,  wateringUnit, isUrgent }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 100,
      background: isUrgent ? COLOR.terra  : COLOR.green5,
      color:      isUrgent ? "#fff"   : COLOR.green2,
    }}>
      <Droplets size={10} fill="currentColor" />
      {wateringDays} {wateringUnit}
    </span>
  )
}