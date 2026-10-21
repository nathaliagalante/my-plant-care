class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async get(path) {
        const response = await fetch(`${this.baseUrl}${path}`)

        let body = null
        const contentType = response.headers.get('Content-Type')
        if (contentType.includes('application/json')) {
            body = await response.json()
        }

        if (response.ok) {
            return body
        }

        throw new Error(
            body?.error || `${response.status} - ${response.statusText}`
        )
    }
}

export default HttpClient