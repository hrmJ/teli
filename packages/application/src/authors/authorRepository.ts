import type { Author } from "@teli/domain/authors";
import { type Publication } from "@teli/domain/publications";

export type AuthorRepository = {
  listLetters: () => Promise<string[]>;
  getDetails: (name: string) => Promise<Author | null>;
  getById: (id: string) => Promise<Author | null>;
  list: (by: { letter: string }) => Promise<Pick<Author, "name" | "id">[]>;
  listAllNames: () => Promise<Pick<Author, "name" | "id">[]>;
  create: (author: Omit<Author, "id" | "publications">) => Promise<Author>;
  addPublication: (authorId: string, publication: Omit<Publication, "id" | "author">) => Promise<boolean>;
};
