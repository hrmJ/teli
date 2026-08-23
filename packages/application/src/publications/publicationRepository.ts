import { type Publication } from "@teliapi/domain/publications";

export type PublicationRepository = {
  getById(id: string): Promise<Publication | null>;
  getByIds(ids: string[]): Promise<Publication[]>;
};
