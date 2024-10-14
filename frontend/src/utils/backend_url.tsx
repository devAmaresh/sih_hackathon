export const backendUrl =
  import.meta.env.DEBUG === "false"
    ? "http://localhost:8000"
    : import.meta.env.VITE_BACKEND_URL;
