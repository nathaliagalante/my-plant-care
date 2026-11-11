import { Bell, Moon, Search, Sun, X } from "lucide-react"
import { COLOR } from "../../assets/styles/theme"

export default function Header({ filter, onFilter, theme, onToggleTheme }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: COLOR.bg,
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 clamp(24px, 8.2vw, 88px)",
        height: 56, display: "flex", alignItems: "center", gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{
            fontSize: 14, fontWeight: 700, color: COLOR.text1, letterSpacing: "-0.03em",
          }}>
            MyPlantCare
          </span>
        </div>

        <div style={{ flex: 1, maxWidth: 280, marginLeft: "auto" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--color-search-bg)", border: "1px solid var(--color-search-border)",
            borderRadius: 100, padding: "0 12px", height: 38,
          }}>
            <Search size={16} color={COLOR.text3} style={{ flexShrink: 0 }} />
            <input
              value={filter}
              onChange={e => onFilter(e.target.value)}
              placeholder="Search plants..."
              style={{
                background: "transparent", border: "none", outline: "none",
                fontSize: 14, color: COLOR.text1, width: "100%",
              }}
            />
            {filter && (
              <button
                onClick={() => onFilter("")}
                aria-label="Clear search"
                style={{ background: "none", border: "none", padding: 0, color: COLOR.text3, display: "flex" }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            aria-pressed={theme === "dark"}
            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}