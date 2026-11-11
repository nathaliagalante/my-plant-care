import HttpClient from "./utils/HttpClient"

class PlantsService {
    constructor() {
        this.httpClient = new HttpClient(import.meta.env.VITE_API_URL || 'http://localhost:3001')
    }

    async listPlants() {
        return this.httpClient.get(`/plants`)
    }

    async searchPlants(query) {
        return this.httpClient.get(`/plants/search?query=${query}`)
    }

    async addPlant(plant) {
        return this.httpClient.post('/plants', plant)
    }

    async waterPlant(id) {
        return this.httpClient.put(`/plants/${encodeURIComponent(id)}`)
    }

    async deletePlant(id) {
        return this.httpClient.delete(`/plants/${encodeURIComponent(id)}`)
    }
}

export default new PlantsService()