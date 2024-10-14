export const backendUrl =
  import.meta.env.DEBUG === "true"
    ? "http://localhost:8000"
    : import.meta.env.VITE_BACKEND_URL;
