export type AuthorRepository = {
  listLetters: () => Promise<string[]>;
};
