const debug = import.meta.env.DEBUG;
export const backendUrl =
  debug === "true" ? "http://localhost:8000" : import.meta.env.VITE_BACKEND_URL;
