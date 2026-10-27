import type { Author } from "@teli/domain/authors";
import type { AuthorRepository } from "./authorRepository.ts";

type Deps = {
  authors: AuthorRepository;
};

export type CreateAuthor = ReturnType<typeof composeCreateAuthor>;

export function composeCreateAuthor({ authors }: Deps) {
  return async function createAuthor(author: Omit<Author, "id" | "name" | "publications"> & { firstName: string; lastName: string }) {
    const name = `${author.lastName.trim()} ${author.firstName.trim()}`;
    const details = await authors.create({ ...author, name });
    return details.id;
  };
}
