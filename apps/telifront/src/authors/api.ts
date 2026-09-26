import * as v from "valibot";
import { config } from "../config";
import {
  AuthorDtoSchema,
  AuthorIndexDtoSchema,
  AuthorListDtoSchema,
} from "@teli/contracts/authors";

import { keycloak } from "../auth/keycloak";

export async function getAuthorIndex() {
  // await keycloak.updateToken(30);
  const response = await fetch(`${config.apiUrl}/authors/letters`);

  if (!response.ok) {
    throw new Error(`Failed to load author: ${response.status}`);
  }

  const data: unknown = await response.json();

  return v.parse(AuthorIndexDtoSchema, data);
}

export async function getAuthorDetails(name: string) {
  const response = await fetch(`${config.apiUrl}/authors/${name}`);

  if (!response.ok) {
    throw new Error(`Failed to load author: ${response.status}`);
  }

  const data: unknown = await response.json();

  const parsed = v.safeParse(AuthorDtoSchema, data);
  if (!parsed.success) {
    throw new Error("Invalid author data");
  }
  return parsed.output;
}

export async function getAuthorsByLetter(letter: string) {
  const response = await fetch(`${config.apiUrl}/authors?letter=${letter}`);

  if (!response.ok) {
    throw new Error(`Failed to load author: ${response.status}`);
  }

  const data: unknown = await response.json();

  return v.parse(AuthorListDtoSchema, data);
}

export async function getAuthorList() {
  const response = await fetch(`${config.apiUrl}/authors/names`);

  if (!response.ok) {
    throw new Error(`Failed to load author name list: ${response.status}`);
  }

  const data: unknown = await response.json();

  return v.parse(AuthorListDtoSchema, data);
}
