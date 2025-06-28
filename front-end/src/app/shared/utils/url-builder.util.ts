const API_BASE_URL = 'http://localhost:3000/api';

export function buildApiUrl(scope: 'admin' | 'public', path: string): string {
  return `${API_BASE_URL}/${scope}/${path}`;
}
