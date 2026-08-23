import { AuthorRepository } from "./authorRepository";

type Deps = {
  authors: AuthorRepository;
};

export type GetAuthorIndex = ReturnType<typeof composeGetAuthorIndex>;

export function composeGetAuthorIndex({ authors }: Deps) {
  return async function getAuthorIndex() {
    const letters = await authors.listLetters();
    return { letters };
  };
}
