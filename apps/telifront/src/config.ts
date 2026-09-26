export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  auth: {
    url: import.meta.env.VITE_IDP_URL,
    realm: import.meta.env.VITE_IDP_REALM,
    clientId: import.meta.env.VITE_IDP_CLIENT_ID,
  },
} as const;
