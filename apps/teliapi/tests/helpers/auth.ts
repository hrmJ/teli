import assert from "node:assert/strict";

const keycloakUrl = "http://localhost:8080";
const realm = "teli";
const clientId = "teli-tests";
const clientSecret = "local-test-client-secret";

export type KeycloakTokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: "Bearer";
};

export async function loginTestUser(): Promise<KeycloakTokens> {
  const response = await fetch(
    `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        client_id: clientId,
        client_secret: clientSecret,
        username: "test",
        password: "test-password",
        scope: "openid",
      }),
    },
  );

  return (await response.json()) as KeycloakTokens;
}

export async function logoutTestUser(refreshToken: string): Promise<void> {
  const response = await fetch(
    `${keycloakUrl}/realms/${realm}/protocol/openid-connect/logout`,
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      }),
    },
  );

  assert.equal(
    response.status,
    204,
    `Keycloak logout failed: ${await response.text()}`,
  );
}
