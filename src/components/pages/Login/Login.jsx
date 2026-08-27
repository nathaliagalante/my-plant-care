import { useState } from "react"
import { COLOR } from "../../../assets/styles/theme"

export default function Login({ email, setEmail, pass, setPass, err, onLogin }) {
  const [showPass, setShowPass] = useState(false)

  const inputBase = {
    width: "100%", border: `1.5px solid ${COLOR.border}`, borderRadius: 10,
    fontSize: 14, color: COLOR.text1, background: COLOR.surfaceAlt, outline: "none",
    transition: "border-color 0.2s",
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <div style={{
        flex: "0 0 44%", background: COLOR.green1,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "3rem", position: "relative", overflow: "hidden",
      }}>
        {[
          { top: -90,  right: -90, size: 300, opacity: 0.12 },
          { top: -45,  right: -45, size: 170, opacity: 0.18 },
        ].map((r, i) => (
          <div key={i} style={{
            position: "absolute", top: r.top, right: r.right,
            width: r.size, height: r.size, borderRadius: "50%",
            border: `1px solid rgba(168,204,136,${r.opacity})`,
          }} />
        ))}
        <div style={{
          position: "absolute", bottom: -110, left: -70,
          width: 320, height: 320, borderRadius: "50%",
          background: "rgba(90,138,60,0.09)",
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
          <span style={{ fontSize: 24 }}>🌿</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22, fontWeight: 600, color: "#fff", letterSpacing: "0.02em",
          }}>
            MyPlantCare
          </span>
        </div>

        <div style={{ position: "relative" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", fontWeight: 500,
            color: "#fff", lineHeight: 1.25, marginBottom: 14,
          }}>
            Cuide do seu<br /><em>jardim interior</em>
          </h2>
          <p style={{ fontSize: 14, color: COLOR.green4, lineHeight: 1.7 }}>
            Organize suas plantas, acompanhe a rega e nunca esqueça dos cuidados do seu verde favorito.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "2rem" }}>
            {["🌿 Monitoramento", "💧 Agenda de Rega", "🪴 Biblioteca"].map(f => (
              <span key={f} style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8, padding: "7px 12px",
                fontSize: 12, color: "#fff",
              }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 11, color: COLOR.green4, position: "relative" }}>
          © 2025 MyPlantCare · Todos os direitos reservados
        </p>
      </div>

      <div style={{
        flex: 1, background: COLOR.bg,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 2rem",
      }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 32, fontWeight: 600, color: COLOR.text1, marginBottom: 6,
          }}>
            Bem-vindo de volta
          </h2>
          <p style={{ fontSize: 14, color: COLOR.text3, marginBottom: "2rem" }}>
            Entre para acessar seu jardim
          </p>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: COLOR.text2, display: "block", marginBottom: 6 }}>
              E-mail
            </label>
            <input
              type="email" value={email} placeholder="seu@email.com"
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && onLogin()}
              style={{ ...inputBase, padding: "12px 14px" }}
              onFocus={e => e.target.style.borderColor = COLOR.green3}
              onBlur={e  => e.target.style.borderColor = COLOR.border}
            />
          </div>

          <div style={{ marginBottom: err ? 12 : 22 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: COLOR.text2, display: "block", marginBottom: 6 }}>
              Senha
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={pass} placeholder="••••••••"
                onChange={e => setPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && onLogin()}
                style={{ ...inputBase, padding: "12px 42px 12px 14px" }}
                onFocus={e => e.target.style.borderColor = COLOR.green3}
                onBlur={e  => e.target.style.borderColor = COLOR.border}
              />
              <button
                onClick={() => setShowPass(v => !v)}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", fontSize: 14, color: COLOR.text3,
                }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {err && <p style={{ fontSize: 13, color: COLOR.terra, marginBottom: 12 }}>⚠ {err}</p>}

          <button
            onClick={onLogin}
            style={{
              width: "100%", padding: "13px",
              background: COLOR.green2, color: "#fff", border: "none",
              borderRadius: 10, fontSize: 15, fontWeight: 600,
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = COLOR.green1}
            onMouseLeave={e => e.currentTarget.style.background = COLOR.green2}
          >
            Entrar
          </button>

          <p style={{ textAlign: "center", fontSize: 12, color: COLOR.text3, marginTop: 18 }}>
            Use qualquer e-mail e senha para o demo
          </p>
        </div>
      </div>
    </div>
  )
}