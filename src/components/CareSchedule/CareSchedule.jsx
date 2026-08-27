import { Droplets } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"

export default function CareSchedule({ plants, onWater }) {
  const cols = ["Planta", "Próxima Rega", "Luz", "Adubação", "Ação"]

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Droplets size={19} fill={COLOR.green2} color={COLOR.green2} />
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLOR.text1 }}>Agenda de Cuidados</h2>
      </div>

      <div style={{
        background: COLOR.surface, borderRadius: 16,
        border: `1px solid ${COLOR.border}`, overflow: "hidden",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
          gap: 12, padding: "10px 24px",
          borderBottom: `1px solid ${COLOR.borderLight}`,
        }}>
          {cols.map(c => (
            <span key={c} style={{
              fontSize: 10, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase", color: COLOR.text3,
            }}>
              {c}
            </span>
          ))}
        </div>

        {plants.map((p, i) => (
          <div
            key={p.id}
            className="anim-fadeUp"
            style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
              gap: 12, alignItems: "center", padding: "14px 24px",
              borderBottom: i < plants.length - 1 ? `1px solid ${COLOR.borderLight}` : "none",
              animationDelay: `${i * 60}ms`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>{p.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLOR.text1 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: COLOR.text3 }}>{p.common}</div>
              </div>
            </div>

            <span style={{
              fontSize: 13, fontWeight: p.isUrgent ? 600 : 400,
              color: p.isUrgent ? COLOR.terra : COLOR.text2,
            }}>
              {p.nextWatering}
            </span>

            <span style={{ fontSize: 13, color: COLOR.text2 }}>{p.sunlight || p.light}</span>
            <span style={{ fontSize: 13, color: COLOR.text2 }}>{p.fertilization || "—"}</span>

            {p.status === "watered" ? (
              <span style={{ fontSize: 13, fontWeight: 600, color: COLOR.green2, whiteSpace: "nowrap" }}>
                Regada ✓
              </span>
            ) : (
              <button
                onClick={() => onWater(p.id)}
                style={{
                  background: COLOR.green2, color: "#fff", border: "none",
                  borderRadius: 8, padding: "6px 14px",
                  fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = COLOR.green1}
                onMouseLeave={e => e.currentTarget.style.background = COLOR.green2}
              >
                Regar agora
              </button>
            )}
          </div>
        ))}

        {plants.length === 0 && (
          <div style={{ padding: "2.5rem", textAlign: "center", color: COLOR.text3, fontSize: 14 }}>
            Nenhuma planta cadastrada ainda.
          </div>
        )}
      </div>
    </section>
  )
}