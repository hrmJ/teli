import { type Publication } from "@teli/domain/publications";
import type { AuthorRepository } from "./authorRepository.ts";

type Deps = {
  authors: AuthorRepository;
};

export type AddPublication = ReturnType<typeof composeAddPublication>;

export function composeAddPublication({ authors }: Deps) {
  return async function addPublication(id: string, publication: Omit<Publication, "id" | "author">) {
    await authors.addPublication(id, publication);
  };
}
