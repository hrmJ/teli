import type { AuthorRepository } from "./authorRepository.ts";

type Deps = {
  authors: AuthorRepository;
};

export type DeleteAuthor = ReturnType<typeof composeDeleteAuthor>;

export function composeDeleteAuthor({ authors }: Deps) {
  return async function deleteAuthor(id: string) {
    const success = await authors.delete(id);
    return success;
  };
}
