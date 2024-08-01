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
        .then(async (res) => {
            if (!res.ok) {
                const details: ApiErrorResponse = await res.json()
                throw new ApiError(details)
            }
            return res.json()
        })
}

export function getServerURL() {
    return process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001"
}

interface ApiErrorResponse {
    statusCode: number;
    message?: string;
}

class ApiError extends Error {
    status: number
    constructor(errorDetails: ApiErrorResponse) {
        super(errorDetails.message)
        this.status = errorDetails.statusCode;
    }
}

export function isApiError(error: Error): error is ApiError {
    return 'status' in error && error.status == 400
}