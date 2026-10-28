import { keycloak } from "../auth/keycloak";
import { config } from "../config";
import { ReceptionForm } from "./ReceptionDialog/receptionFormReducer";

export async function saveReception(data: ReceptionForm, originalId: string) {
  if (!keycloak.token) throw new Error("Unauthenticated");
  await keycloak.updateToken(30);
  const response = await fetch(`${config.apiUrl}/publications/${originalId}/receptions`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${keycloak.token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to save receptions : ${response.status}`);
  }
}
