import { type AuthorRepository } from "./authorRepository.ts";

type Deps = {
  authors: AuthorRepository;
};

export type GetAuthorDetails = ReturnType<typeof composeGetAuthorDetails>;

export function composeGetAuthorDetails({ authors }: Deps) {
  return async function getAuthorDetails(name: string) {
    const details = await authors.getDetails(name);
    return details;
  };
}
