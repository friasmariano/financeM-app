
const API_URL = process.env.NEXT_PUBLIC_API_BASE || '';

export async function fetchClient<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_URL}${path.startsWith('/') ? path:  '/' + path}`;

    try {
        const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options
    })

    if (!response.ok) {
        let errorText = '';

        try {
         errorText = await response.text();
        }
        catch {

        }

        throw new Error(errorText || `Request to ${url} failed with status ${response.status}`);
    }

    try {
        return await response.json();
    } catch(jsonError) {
        throw new Error(`Failed to parse JSON response from ${url}: ${jsonError}`);
    }


    } catch(error) {
        throw new Error(`Fetch error for ${url}: ${error instanceof Error ? error.message : error}`);
    }
}