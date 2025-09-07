// src/api/client.js
const API_BASE = "https://v2.api.noroff.dev";

async function safeFetch(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const json = await res.json();
  return json.data; // v2 wraps payload in { data }
}

export const api = {
  listProducts: () => safeFetch(`${API_BASE}/online-shop`),
  getProduct: (id) => safeFetch(`${API_BASE}/online-shop/${id}`),
};
