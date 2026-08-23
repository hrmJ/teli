import * as v from "valibot";
import { config } from "../config";
import { AuthorIndexDtoSchema } from "@teliapi/contracts/authors";

export async function getAuthorIndex() {
  const response = await fetch(`${config.apiUrl}/authors/index`);

  if (!response.ok) {
    throw new Error(`Failed to load author: ${response.status}`);
  }

  const data: unknown = await response.json();

  return v.parse(AuthorIndexDtoSchema, data);
}
