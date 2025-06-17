const API_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080/api';

export async function fetchClient<T>(
    path: string,
    options: RequestInit = {}
): Promise<T | null> {
    const url = `${API_URL}${path.startsWith('/') ? path : '/' + path}`;

    console.log('API URL:', API_URL);

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options
        });

        if (!response.ok) {
            let errorText = '';

            try {
                errorText = await response.text();
            } catch {}

            console.log(`Request to ${url} failed with status ${response.status}: ${errorText}`);
            return null;  // Instead of throw, return null
        }

        try {
            return await response.json();
        } catch (jsonError) {
            console.error(`Failed to parse JSON response from ${url}:`, jsonError);
            return null;
        }

    } catch (error) {
        console.log(`Fetch error for ${url}:`, error instanceof Error ? error.message : error);
        return null;
    }
}