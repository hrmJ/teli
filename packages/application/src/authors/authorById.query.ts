import type { AuthorRepository } from "./authorRepository.ts";

type Deps = {
  authors: AuthorRepository;
};

export type GetAuthorById = ReturnType<typeof composeGetAuthorById>;

export function composeGetAuthorById({ authors }: Deps) {
  return async function getAuthorById(id: string) {
    return await authors.getById(id);
  };
}
