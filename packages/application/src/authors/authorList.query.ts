import type { AuthorRepository } from "./authorRepository.ts";

type Deps = {
  authors: AuthorRepository;
};

export type ListAuthors = ReturnType<typeof composeListAuthors>;

export function composeListAuthors({ authors }: Deps) {
  return async function listAuthors(by: { letter: string }) {
    const details = await authors.list(by);
    return details;
  };
}
