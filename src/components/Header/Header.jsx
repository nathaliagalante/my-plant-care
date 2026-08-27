import { Bell, Search, User, X } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"

export default function Header({ user, filter, onFilter, onLogout }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: COLOR.bg, borderBottom: `1px solid ${COLOR.border}`,
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem",
        height: 64, display: "flex", alignItems: "center", gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 20 }}>🌿</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20, fontWeight: 600, color: COLOR.green2, letterSpacing: "0.02em",
          }}>
            MyPlantCare
          </span>
        </div>

        <div style={{ flex: 1, maxWidth: 460, margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#ddd9cc", borderRadius: 100, padding: "0 14px", height: 38,
          }}>
            <Search size={15} color={COLOR.text3} style={{ flexShrink: 0 }} />
            <input
              value={filter}
              onChange={e => onFilter(e.target.value)}
              placeholder="Buscar na biblioteca..."
              style={{
                background: "transparent", border: "none", outline: "none",
                fontSize: 14, color: COLOR.text1, width: "100%",
              }}
            />
            {filter && (
              <button
                onClick={() => onFilter("")}
                style={{ background: "none", border: "none", padding: 0, color: COLOR.text3, display: "flex" }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <button style={{
            width: 36, height: 36, borderRadius: "50%", border: "none",
            background: "transparent", color: COLOR.green2,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Bell size={18} />
          </button>

          <button style={{
            width: 36, height: 36, borderRadius: "50%",
            border: `2px solid ${COLOR.green2}`, background: "transparent",
            color: COLOR.green2, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <User size={15} />
          </button>

          <div style={{ width: 1, height: 22, background: COLOR.border }} />

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLOR.text1, lineHeight: 1.2 }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: COLOR.text3 }}>{user?.email}</div>
          </div>

          <button
            onClick={onLogout}
            style={{
              background: "transparent", border: `1px solid ${COLOR.border}`,
              borderRadius: 8, padding: "6px 14px",
              fontSize: 13, fontWeight: 500, color: COLOR.text2,
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = COLOR.surfaceAlt; e.currentTarget.style.borderColor = COLOR.green3 }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = COLOR.border }}
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}