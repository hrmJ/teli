import type { Publication } from "@teli/domain/publications";

export type PublicationRepository = {
  getById(id: string): Promise<Publication | null>;
  updateById(id: string, publication: Publication): Promise<boolean>;
  getByIds(ids: string[]): Promise<Publication[]>;
  searchByTitle(title: string): Promise<Publication[]>;
  create(publication: Omit<Publication, "id">): Promise<Publication>;
};
