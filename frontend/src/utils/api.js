const BASE = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}
export function fetchSessions() {
  return request(`/sessions`);
}

export function fetchSessionEvents(sessionId) {
  return request(`/sessions/${sessionId}/events`);
}

export function fetchHeatmapPages() {
  return request("/heatmap/pages");
}

export function fetchHeatmapClicks(url) {
  return request(`/heatmap?url=${encodeURIComponent(url)}`);
}

export function fetchStats() {
  return request("/stats");
}