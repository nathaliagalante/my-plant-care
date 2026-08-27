import { useState, useRef, useCallback } from "react"
import { Search, X } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"
import { searchPlants } from "../../api/plantApi"
import { PLANT_ICONS } from "../../data/mockData"

export default function Modal({ existingNames, onAdd, onClose }) {
  const [query,    setQuery]    = useState("")
  const [results,  setResults]  = useState([])
  const [loading,  setLoading]  = useState(false)
  const [apiError, setApiError] = useState(false)
  const debounceRef = useRef(null)

  const handleSearch = useCallback((val) => {
    setQuery(val)
    setApiError(false)
    clearTimeout(debounceRef.current)
    if (val.trim().length < 2) { setResults([]); return }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await searchPlants(val)
        setResults(res.map((p, i) => ({
          ...p,
          icon:         PLANT_ICONS[(i + 3) % PLANT_ICONS.length],
          isUrgent:     false,
          status:       "watered",
          nextWatering: "7 dias",
        })))
      } catch {
        setApiError(true)
        setResults([])
      }
      setLoading(false)
    }, 600)
  }, [])

  return (
    <div
      className="anim-fadeUp"
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(10,20,8,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
      }}
    >
      <div
        className="anim-scaleIn"
        onClick={e => e.stopPropagation()}
        style={{
          background: COLOR.surface, borderRadius: 20,
          width: "100%", maxWidth: 520,
          border: `1px solid ${COLOR.border}`, overflow: "hidden",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px 16px", borderBottom: `1px solid ${COLOR.borderLight}`,
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 24, fontWeight: 600, color: COLOR.text1,
            }}>
              Adicionar Planta
            </h2>
            <p style={{ fontSize: 12, color: COLOR.text3, marginTop: 2 }}>
              Busca na base de dados botânica
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8,
              border: `1px solid ${COLOR.border}`, background: "transparent",
              color: COLOR.text3, display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: "16px 24px 12px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            border: `1.5px solid ${COLOR.green4}`, borderRadius: 12,
            padding: "0 14px", height: 44, background: COLOR.surfaceAlt,
          }}>
            <Search size={16} color={COLOR.text3} style={{ flexShrink: 0 }} />
            <input
              autoFocus
              value={query}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Ex: monstera, jiboia, suculenta..."
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontSize: 14, color: COLOR.text1,
              }}
            />
            {loading && <span className="anim-spin">🌿</span>}
          </div>
        </div>

        <div style={{ padding: "0 24px 20px", maxHeight: 360, overflowY: "auto" }}>
          {!query && (
            <div style={{
              background: COLOR.green5, borderRadius: 12,
              padding: "14px 16px", fontSize: 13, color: COLOR.green2, lineHeight: 1.6,
            }}>
              ✨ Digite ao menos 2 caracteres para buscar plantas reais.
            </div>
          )}

          {loading && (
            <div style={{ textAlign: "center", padding: "2rem", color: COLOR.text3, fontSize: 13 }}>
              Buscando plantas...
            </div>
          )}

          {apiError && !loading && (
            <div style={{
              background: COLOR.terraLight, borderRadius: 12,
              padding: "14px 16px", fontSize: 13, color: COLOR.terra,
            }}>
              ⚠ Erro ao buscar. Verifique sua chave de API e conexão.
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="anim-slideDown" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {results.map((plant, i) => {
                const already = existingNames.includes(plant.name?.toLowerCase())
                return (
                  <button
                    key={i}
                    onClick={() => !already && onAdd(plant)}
                    disabled={already}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 14px", borderRadius: 12, textAlign: "left",
                      border: `1px solid ${already ? COLOR.borderLight : COLOR.green5}`,
                      background: already ? COLOR.surfaceAlt : COLOR.surface,
                      opacity: already ? 0.65 : 1,
                      cursor: already ? "default" : "pointer",
                      transition: "background 0.15s, border-color 0.15s",
                    }}
                    onMouseEnter={e => { if (!already) { e.currentTarget.style.background = COLOR.green5; e.currentTarget.style.borderColor = COLOR.green4 } }}
                    onMouseLeave={e => { if (!already) { e.currentTarget.style.background = COLOR.surface; e.currentTarget.style.borderColor = COLOR.green5 } }}
                  >
                    <div style={{
                      width: 42, height: 42, borderRadius: 10, background: COLOR.green5, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, overflow: "hidden"
                    }}>
                      {plant.image ? <img src={plant.image} alt={plant.name} style={{width: "100%", height: "100%", objectFit: "cover"}} /> : plant.icon}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 16, fontWeight: 600, color: COLOR.text1,
                      }}>
                        {plant.name}
                      </p>
                      <p style={{ fontSize: 12, color: COLOR.text2 }}>{plant.common}</p>
                      <p style={{ fontSize: 11, color: COLOR.text3, marginTop: 2 }}>
                        💧 {plant.water} · ☀️ {plant.light}
                      </p>
                    </div>

                    {already
                      ? <span style={{ fontSize: 11, color: COLOR.text3, flexShrink: 0 }}>Adicionada</span>
                      : <span style={{ fontSize: 18, color: COLOR.green3, flexShrink: 0 }}>+</span>
                    }
                  </button>
                )
              })}
            </div>
          )}

          {!loading && !apiError && query.length >= 2 && results.length === 0 && (
            <div style={{ textAlign: "center", padding: "2rem", color: COLOR.text3 }}>
              <p style={{ fontSize: 28, marginBottom: 8 }}>🌾</p>
              <p style={{ fontSize: 13 }}>Nenhum resultado. Tente outro nome.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}