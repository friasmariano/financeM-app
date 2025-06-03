
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export async function fetchClient<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const rest = await fetch(`${API_BASE}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options
    });

    if (!rest.ok) {
        const error = await rest.text();
        throw new Error(error || 'API error');
    }

    return rest.json();
}