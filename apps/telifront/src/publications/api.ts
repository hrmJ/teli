import { config } from "../config";
import * as v from "valibot";
import { NewReceptionData, ReceptionDtoSchema } from "@teli/contracts/receptions";
import { NewPublicationDtoSchema, PublicationListDtoSchema } from "@teli/contracts/publications";
import { keycloak } from "../auth/keycloak";

export async function getReceptions(originalId: string) {
  const response = await fetch(`${config.apiUrl}/publications/${originalId}/receptions`);

  if (!response.ok) {
    throw new Error(`Failed to load receptions: ${response.status}`);
  }

  const data: unknown = await response.json();
  const parsed = v.safeParse(ReceptionDtoSchema, data);
  if (!parsed.success) {
    throw new Error("Invalid reception data");
  }
  return parsed.output;
}

export async function getPublications(title: string) {
  const response = await fetch(`${config.apiUrl}/publications?title=${title}`);

  if (!response.ok) {
    throw new Error(`Failed to search publications: ${response.status}`);
  }

  const data: unknown = await response.json();
  const parsed = v.safeParse(PublicationListDtoSchema, data);
  if (!parsed.success) {
    throw new Error("Invalid publications data");
  }
  return parsed.output.publications;
}

export async function updateReceptions(originalId: string, receptionData: NewReceptionData) {
  const response = await fetch(`${config.apiUrl}/publications/${originalId}/receptions`, {
    method: "PUT",
    body: JSON.stringify(receptionData),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ???`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load receptions: ${response.status}`);
  }

  const data: unknown = await response.json();
  const parsed = v.safeParse(ReceptionDtoSchema, data);
  if (!parsed.success) {
    throw new Error("Invalid reception data");
  }
  return parsed.output;
}

export async function saveNewPublication(data: { publication: NewPublicationDtoSchema; authorId: string }) {
  if (!keycloak.token) throw new Error("Unauthenticated");
  await keycloak.updateToken(30);
  const response = await fetch(`${config.apiUrl}/publications`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${keycloak.token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to create publication: ${response.status}`);
  }
}
