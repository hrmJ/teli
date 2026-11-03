import type { Publication } from "@teli/domain/publications";
import type { ReceptionType } from "@teli/domain/receptions";

export type PublicationRepository = {
  getById(id: string): Promise<Publication | null>;
  updateById(id: string, publication: Partial<Omit<Publication, "id" | "author">>, newAuthorId?: string): Promise<boolean>;
  getByIds(ids: string[]): Promise<Publication[]>;
  searchByTitle(title: string): Promise<Publication[]>;
  searchByQuery(query: string): Promise<string[]>;
  filterByReceptionType(ids: string[], receptionTypes: ReceptionType[], originals: boolean): Promise<string[]>;
  create(publication: Omit<Publication, "id" | "author">, authorId: string): Promise<Publication>;
  updateReceptionsById: (originalId: string, receptionIdsByType: string[], receptionType: ReceptionType) => Promise<boolean>;
  updateReceptionsOfById: (originalId: string, receptionOf: string[]) => Promise<boolean>;
};
