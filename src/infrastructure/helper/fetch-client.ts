export default async function fetchClient(url: string, method: 'GET' | 'POST' | 'DELETE' | 'PATCH' = 'GET', body?: Record<string, unknown>) {
    const reqInit: RequestInit = { method: method, credentials: 'include' }
    if (body) reqInit['body'] = JSON.stringify(body)

    const res = await fetch(url, reqInit)
    const resJson = await res.json()

    if (res.ok) {
        return resJson
    } else {
        //@ts-expect-error error type
        throw new Error(resJson.message, res.status, resJson.errors)
        return { ...resJson, isError: true }
    }

}