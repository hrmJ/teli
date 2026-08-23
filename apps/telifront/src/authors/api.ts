import * as v from "valibot";
import { config } from "../config";
import {
  AuthorDtoSchema,
  AuthorIndexDtoSchema,
  AuthorListDtoSchema,
} from "@teliapi/contracts/authors";

export async function getAuthorIndex() {
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

  return v.parse(AuthorDtoSchema, data);
}

export async function getAuthorsByLetter(letter: string) {
  const response = await fetch(`${config.apiUrl}/authors?letter=${letter}`);

  if (!response.ok) {
    throw new Error(`Failed to load author: ${response.status}`);
  }

  const data: unknown = await response.json();

  return v.parse(AuthorListDtoSchema, data);
}
