import { COLOR } from "../../assets/styles/theme"

function formatWateringDate(value) {
  if (typeof value !== "string") return value

  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T|$)/.exec(value)
  if (!match) return value

  const [, year, month, day] = match
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  if (
    date.getUTCFullYear() !== Number(year) ||
    date.getUTCMonth() !== Number(month) - 1 ||
    date.getUTCDate() !== Number(day)
  ) {
    return value
  }

  return `${day}/${month}/${year}`
}

export default function CareSchedule({ plants, onWater }) {
  return (
    <section style={{ marginBottom: "3.25rem" }}>
      <div style={{ marginBottom: 10 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLOR.text1, letterSpacing: "-0.02em" }}>Upcoming watering</h2>
      </div>

      <div>
        {plants.map((plant, i) => (
          <div
            key={plant.id}
            className="anim-fadeUp care-row"
            style={{
              display: "grid",
              gap: 12, alignItems: "center", padding: "10px 6px",
              borderBottom: i < plants.length - 1 ? `1px solid ${COLOR.borderLight}` : "none",
              animationDelay: `${i * 60}ms`,
            }}
          >
            <div className="care-plant" style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLOR.text1 }}>{plant.name}</div>
                {plant.sunlight && plant.sunlight.length > 0 && (
                  <div style={{ fontSize: 12, color: COLOR.text3 }}>{plant.sunlight.join(', ')}</div>
                )}
              </div>
            </div>

            <div className="care-last" style={{ fontSize: 12, color: COLOR.text3 }}>
              <span style={{ display: "block" }}>Last watered</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: COLOR.text1 }}>
                {plant.lastWatering ? formatWateringDate(plant.lastWatering) : "-"}
              </span>
            </div>
            <div className="care-next" style={{ fontSize: 12, color: COLOR.text3 }}>
              <span style={{ display: "block" }}>Next watering</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: plant.isUrgent ? COLOR.terra : COLOR.text1 }}>
                {formatWateringDate(plant.nextWatering)}
              </span>
            </div>

            {plant.status === "watered" ? (
              <span className="care-action" style={{ fontSize: 13, fontWeight: 600, color: COLOR.green2, whiteSpace: "nowrap" }}>
                Watered ✓
              </span>
            ) : (
              <button
                className="care-action"
                onClick={() => onWater(plant.id)}
                style={{
                  background: COLOR.green2, color: "#fff", border: "none",
                  borderRadius: 100, padding: "7px 14px",
                  fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = COLOR.green1}
                onMouseLeave={e => e.currentTarget.style.background = COLOR.green2}
              >
                Water Now
              </button>
            )}
          </div>
        ))}

        {plants.length === 0 && (
          <div style={{ padding: "2rem", textAlign: "center", color: COLOR.text3, fontSize: 14 }}>
            No plants added yet.
          </div>
        )}
      </div>
    </section>
  )
}