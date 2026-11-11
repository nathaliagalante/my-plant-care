import { useState } from "react"
import { LayoutGrid, List, Leaf } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"
import PlantCard from "../PlantCard/PlantCard"
import PlantListRow from "../PlantListRow/PlantListRow"

export default function PlantLibrary({ plants, onRemove, filter }) {
  const [view, setView] = useState("grid")

  return (
    <section>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLOR.text1, letterSpacing: "-0.02em" }}>
          The Library
          {filter && (
            <span style={{ fontSize: 15, fontWeight: 400, color: COLOR.text3, marginLeft: 10 }}>
              "{filter}"
            </span>
          )}
        </h2>

        <div style={{
          display: "flex", gap: 2, background: "#ebe8f0",
          border: "none", borderRadius: 100, padding: 3,
        }}>
          {[{ id: "grid", Icon: LayoutGrid, label: "Grid" }, { id: "list", Icon: List, label: "List" }].map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              aria-label={label}
              style={{
                padding: "6px 8px", borderRadius: 100, border: "none",
                background: view === id ? COLOR.surface : "transparent",
                color:      view === id ? COLOR.text1   : COLOR.text3,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s",
              }}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      {view === "grid" && plants.length > 0 && (
        <div className="plant-grid">
          {plants.map((p, i) => (
            <PlantCard key={p.id} plant={p} onRemove={onRemove} delay={i * 50} />
          ))}
        </div>
      )}

      {view === "list" && plants.length > 0 && (
        <div style={{
          background: COLOR.surface, borderRadius: 16,
          border: `1px solid ${COLOR.border}`, overflow: "hidden",
        }}>
          {plants.map((p, i) => (
            <PlantListRow
              key={p.id} plant={p} onRemove={onRemove}
              last={i === plants.length - 1}
            />
          ))}
        </div>
      )}

      {plants.length === 0 && (
        <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
          <Leaf size={48} color={COLOR.green4} style={{ margin: "0 auto 16px" }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22, color: COLOR.text2, marginBottom: 8,
          }}>
            {filter ? `No results for "${filter}"` : "Your garden is empty"}
          </p>
          <p style={{ fontSize: 15, color: COLOR.text3 }}>
            {filter ? "Try another filter." : "Add your first plant!"}
          </p>
        </div>
      )}
    </section>
  )
}