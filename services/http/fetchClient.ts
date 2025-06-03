
const API_URL = process.env.NEXT_PUBLIC_API_BASE || '';

export async function fetchClient<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_URL}${path.startsWith('/') ? path:  '/' + path}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options
    })

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || `Request to ${url} failed with status ${response.status}`);
    }

    return response.json();
}