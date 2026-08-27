import { useState } from "react"
import { LayoutGrid, List, Leaf } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"
import PlantCard from "../PlantCard/PlantCard"
import PlantListRow from "../PlantListRow/PlantListRow"

export default function PlantLibrary({ plants, onRemove, filter }) {
  const [view, setView] = useState("grid")

  return (
    <section>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: COLOR.text1, letterSpacing: "-0.02em" }}>
          A Biblioteca
          {filter && (
            <span style={{ fontSize: 14, fontWeight: 400, color: COLOR.text3, marginLeft: 10 }}>
              "{filter}"
            </span>
          )}
        </h2>

        <div style={{
          display: "flex", gap: 4, background: COLOR.surface,
          border: `1px solid ${COLOR.border}`, borderRadius: 10, padding: 4,
        }}>
          {[{ id: "grid", Icon: LayoutGrid, label: "Grade" }, { id: "list", Icon: List, label: "Lista" }].map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              aria-label={label}
              style={{
                padding: "6px 8px", borderRadius: 7, border: "none",
                background: view === id ? COLOR.green2 : "transparent",
                color:      view === id ? "#fff"   : COLOR.text3,
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
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}>
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
            {filter ? `Nenhum resultado para "${filter}"` : "Seu jardim está vazio"}
          </p>
          <p style={{ fontSize: 14, color: COLOR.text3 }}>
            {filter ? "Tente outro filtro." : "Adicione sua primeira planta!"}
          </p>
        </div>
      )}
    </section>
  )
}