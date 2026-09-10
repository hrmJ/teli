import type { Publication } from "@teli/domain/publications";

export type PublicationRepository = {
  getById(id: string): Promise<Publication | null>;
  getByIds(ids: string[]): Promise<Publication[]>;
};
