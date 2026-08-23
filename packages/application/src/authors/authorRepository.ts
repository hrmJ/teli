import type { Author } from "@teliapi/domain/authors";

export type AuthorRepository = {
  listLetters: () => Promise<string[]>;
  getDetails: (name: string) => Promise<Author | null>;
  list: (by: { letter: string }) => Promise<Pick<Author, "name">[]>;
};
