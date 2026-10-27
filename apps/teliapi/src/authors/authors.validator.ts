import { NewAuthorDtoSchema } from "@teli/contracts/authors";
import * as v from "valibot";

export function validateNewAuthor(data: unknown) {
  const parsed = v.safeParse(NewAuthorDtoSchema, data);
  if (!parsed.success) {
    console.log(parsed.issues);
    throw new Error("Invalid author data");
  }
  return parsed.output;
}
