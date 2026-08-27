import { useState, useRef } from "react"
import { Plus } from "lucide-react"
import { COLOR } from "./assets/styles/theme"
import { SEED_PLANTS } from "./data/mockData"

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import CareSchedule from "./components/CareSchedule/CareSchedule"
import PlantLibrary from "./components/PlantLibrary/PlantLibrary"
import Modal from "./components/Modal/Modal"
import Login from "./components/pages/Login/Login"

import "./assets/styles/global.css"

export default function App() {
  const [screen,      setScreen]      = useState("login")
  const [user,        setUser]        = useState(null)
  const [plants,      setPlants]      = useState(SEED_PLANTS)
  const [filter,      setFilter]      = useState("")
  const [showModal,   setShowModal]   = useState(false)
  const [loginEmail,  setLoginEmail]  = useState("")
  const [loginPass,   setLoginPass]   = useState("")
  const [loginErr,    setLoginErr]    = useState("")
  const nextId = useRef(200)

  // ── Auth ──
  const handleLogin = () => {
    if (!loginEmail || !loginPass) { setLoginErr("Preencha todos os campos."); return }
    if (!loginEmail.includes("@"))  { setLoginErr("E-mail inválido."); return }
    const name = loginEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    setUser({ name, email: loginEmail })
    setScreen("dashboard")
    setLoginErr("")
  }

  const handleLogout = () => {
    setUser(null); setScreen("login")
    setLoginEmail(""); setLoginPass(""); setFilter("")
    setShowModal(false); setLoginErr("")
  }

  // ── Plants CRUD ──
  const addPlant = (p) => {
    if (plants.some(pl => pl.name.toLowerCase() === p.name.toLowerCase())) return
    setPlants(prev => [...prev, {
      ...p,
      id:           nextId.current++,
      added:        new Date().toISOString().slice(0, 10),
      isUrgent:     false,
      status:       "watered",
      nextWatering: "7 dias",
    }])
    setShowModal(false)
  }

  const removePlant = (id) => setPlants(prev => prev.filter(p => p.id !== id))

  const waterPlant  = (id) => setPlants(prev => prev.map(p =>
    p.id === id ? { ...p, status: "watered", isUrgent: false, nextWatering: "7 dias" } : p
  ))

  const filteredPlants = plants.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.common.toLowerCase().includes(filter.toLowerCase())
  )

  if (screen === "login") return (
    <Login
      email={loginEmail} setEmail={setLoginEmail}
      pass={loginPass}   setPass={setLoginPass}
      err={loginErr}     onLogin={handleLogin}
    />
  )

  return (
    <div style={{ minHeight: "100vh", background: COLOR.bg }}>
      <Header user={user} filter={filter} onFilter={setFilter} onLogout={handleLogout} />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        <Hero plantCount={plants.length} onAdd={() => setShowModal(true)} />
        <CareSchedule plants={plants} onWater={waterPlant} />
        <PlantLibrary plants={filteredPlants} onRemove={removePlant} filter={filter} />
      </main>

      <button
        onClick={() => setShowModal(true)}
        aria-label="Adicionar planta"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 40,
          width: 56, height: 56, borderRadius: "50%",
          background: COLOR.green2, color: "#fff", border: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(30,58,14,0.35)",
        }}
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      {showModal && (
        <Modal
          existingNames={plants.map(p => p.name.toLowerCase())}
          onAdd={addPlant}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}