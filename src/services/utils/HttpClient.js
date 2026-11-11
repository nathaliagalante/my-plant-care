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

    async post(path, data) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const body = await response.json()

        if (response.ok) {
            return body
        }

        throw new Error(
            body?.error || `${response.status} - ${response.statusText}`
        )
    }

    async put(path, data) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const body = await response.json()

        if (response.ok) {
            return body
        }

        throw new Error(
            body?.error || `${response.status} - ${response.statusText}`
        )
    }

    async delete(path) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (response.ok) return 


        throw new Error(
            `${response.status} - ${response.statusText}`
        )

    }
}

export default HttpClient