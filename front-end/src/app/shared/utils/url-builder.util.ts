const API_BASE_URL = 'http://localhost:3000/api';

export function adminApiUrl(path: string): string {
  return `${API_BASE_URL}/admin/${path}`;
}

export function publicApiUrl(path: string): string {
  return `${API_BASE_URL}/${path}`;
}
