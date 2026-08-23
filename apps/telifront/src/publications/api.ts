import { config } from "../config";
import * as v from "valibot";
import { ReceptionDtoSchema } from "@teliapi/contracts/receptions";

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
