import { NewAuthorDtoSchema } from "@teli/contracts/authors";
import * as v from "valibot";

export function validateNewAuthorName(
  authorMap: Map<string, { name: string; id: string }>,
  name: { firstName: unknown; lastName: unknown },
) {
  if (typeof name.firstName !== "string" || typeof name.lastName !== "string") {
    return;
  }
  const firstName = name.firstName.trim().toLowerCase();
  const lastName = name.lastName.trim().toLowerCase();
  if (!authorMap.has(`${lastName} ${firstName}`)) return;
  return "Tekijä on jo olemassa";
}

export function validateNewAuthor(data: unknown): string[] {
  console.log({ data });
  const parsed = v.safeParse(NewAuthorDtoSchema, data);
  if (!parsed.success) {
    return parsed.issues.map((issue) => issue.message);
  }
  return [];
}
