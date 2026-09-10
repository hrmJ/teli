import type { Author } from "@teli/domain/authors";

export type AuthorRepository = {
  listLetters: () => Promise<string[]>;
  getDetails: (name: string) => Promise<Author | null>;
  list: (by: { letter: string }) => Promise<Pick<Author, "name">[]>;
};
