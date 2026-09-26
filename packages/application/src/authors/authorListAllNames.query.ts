import type { AuthorRepository } from "./authorRepository.ts";

type Deps = {
  authors: AuthorRepository;
};

export type ListAuthorNames = ReturnType<typeof composeListAuthorNames>;

export function composeListAuthorNames({ authors }: Deps) {
  return async function listAuthorNames() {
    return await authors.listAllNames();
  };
}
