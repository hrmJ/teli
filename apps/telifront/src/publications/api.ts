import { config } from "../config";
import * as v from "valibot";
import { ReceptionDtoSchema } from "@teli/contracts/receptions";
import { PublicationListDtoSchema } from "@teli/contracts/publications";

export async function getReceptions(originalId: string) {
  const response = await fetch(
    `${config.apiUrl}/publications/${originalId}/receptions`,
  );

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
