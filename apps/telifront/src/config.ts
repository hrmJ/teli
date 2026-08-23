export const config = {
  apiUrl: import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://puolukka.rd.tuni.fi/tekstitliikkeessa/api",
} as const;
