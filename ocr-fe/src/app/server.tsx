export async function getVersion(): Promise<string> {
    return apiFetch('/version', {})
        .then(res => res.version)
}

export async function uploadImage(formData: FormData): Promise<string> {
    return apiFetch('/ocr', {method: 'POST', body: formData})
        .then(res => res.ocrResult)
}

function apiFetch(route: string, params: RequestInit) {
    return fetch(getServerURL() + route, params)
        .then(res => {
            if (!res.ok) {
                throw new ApiError(res);
            }
            return res.json()
        })
}

export function getServerURL() {
    return process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001"
}

class ApiError extends Error {
    status: number
    constructor(response: Response) {
        super(response.statusText)
        this.status = response.status;
    }
}
