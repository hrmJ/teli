import type { Author } from "@teli/domain/authors";
import type { AuthorRepository } from "./authorRepository.ts";

type Deps = {
  authors: AuthorRepository;
};

export type UpdateAuthor = ReturnType<typeof composeUpdateAuthor>;

export function composeUpdateAuthor({ authors }: Deps) {
  return async function UpdateAuthor(
    id: string,
    author: Omit<Author, "id" | "name" | "publications"> & { firstName: string; lastName: string },
  ) {
    const name = `${author.lastName.trim()} ${author.firstName.trim()}`;
    const details = await authors.update(id, { ...author, name });
    return details.id;
  };
}
