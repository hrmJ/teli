import { createContext } from "react";

type AuthorContext = {
  authors: { id: string; name: string }[];
  authorMap: Map<string, { id: string; name: string }>;
};

export const AuthorContext = createContext<AuthorContext>({
  authors: [],
  authorMap: new Map(),
});
