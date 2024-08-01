export async function getVersion(): Promise<string> {
    return apiFetch('/version')
        .then(res => res.version)
}

function apiFetch(route: string) {
    return fetch(getServerURL() + route)
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
    errorCode: number
    constructor(response: Response) {
        super(response.statusText)
        this.errorCode = response.status;
    }
}
