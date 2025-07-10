const API_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080/api';

export async function fetchClient(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_URL}${path.startsWith('/') ? path : '/' + path}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    return response;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
}