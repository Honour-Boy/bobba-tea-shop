import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const TOKEN_KEY = "bobba_token";

const client = axios.create({ baseURL, timeout: 10000 });

// Attach the auth token (the backend expects a custom `auth-token` header).
client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers["auth-token"] = token;
  }
  return config;
});

// Normalise the various error shapes the backend returns into a single message.
export function apiError(err) {
  if (err?.code === "ECONNABORTED") {
    return "Email or password are invalid. Please try again.";
  }
  const data = err?.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (data?.Message) return data.Message;
  if (data?.error) return data.error;
  return err?.message || "Something went wrong. Please try again.";
}

export default client;
