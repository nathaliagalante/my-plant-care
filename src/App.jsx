import { useState, useEffect } from "react"
import { COLOR } from "./assets/styles/theme"

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import CareSchedule from "./components/CareSchedule/CareSchedule"
import PlantLibrary from "./components/PlantLibrary/PlantLibrary"
import Modal from "./components/Modal/Modal"

import "./assets/styles/global.css"

import PlantsService from "./services/PlantsService"

export default function App() {
  const [plants,      setPlants]      = useState([])
  const [filter,      setFilter]      = useState("")
  const [showModal,   setShowModal]   = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState("light")

  async function loadPlants() {
    try {
      setIsLoading(true)

      const savedPlants = await PlantsService.listPlants()

      setPlants(savedPlants)
    } catch(error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAddPlant (plant) {
    try {
      const savedPlant = await PlantsService.addPlant(plant)

      setPlants(current => [...current, savedPlant])
    } catch (error) {
      console.error(error)
    } finally {
      setShowModal(false)
    }
  }

  async function handleDeletePlant (id) {
    try {
      await PlantsService.deletePlant(id)

      setPlants(currentPlants => currentPlants.filter(plant => plant.id !== id))

    } catch (error) {
      console.error(error)
    }
  }

  async function handleWaterPlant (id) {
    try {
      const updatedPlant = await PlantsService.waterPlant(id)

      setPlants(currentPlant => currentPlant.map(plant => plant.id === updatedPlant.id ? {...plant, ...updatedPlant} : plant))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadPlants()
  }, [])

  const filteredPlants = plants.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    (p.common || p.commonName || "").toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div data-theme={theme} style={{ minHeight: "100vh", background: COLOR.bg }}>
      <Header
        filter={filter}
        onFilter={setFilter}
        theme={theme}
        onToggleTheme={() => setTheme(current => current === "light" ? "dark" : "light")}
      />

      <main className="dashboard-main">
        <Hero plantCount={plants.length} onAdd={() => setShowModal(true)} />
        {isLoading && <span className="anim-spin">🌿</span>}
        <CareSchedule plants={plants} onWater={handleWaterPlant} />
        <PlantLibrary plants={filteredPlants} onRemove={handleDeletePlant} filter={filter} />
      </main>

      {showModal && (
        <Modal
          existingNames={plants.map(p => p.name.toLowerCase())}
          onAdd={handleAddPlant}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}