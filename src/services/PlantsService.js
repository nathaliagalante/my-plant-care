import HttpClient from "./utils/HttpClient"

class PlantsService {
    constructor() {
        this.httpClient = new HttpClient('http://localhost:3001')
    }

    async listPlants() {
        return this.httpClient.get(`/plants`)
    }

    async searchPlants(query) {
        return this.httpClient.get(`/plants/search?query=${query}`)
    }
}

export default new PlantsService()