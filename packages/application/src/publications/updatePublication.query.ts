import type { Publication } from "@teli/domain/publications";
import type { PublicationRepository } from "./publicationRepository.ts";

type Deps = {
  publications: PublicationRepository;
};

export type UpdatePublication = ReturnType<typeof composeUpdatePublication>;

export function composeUpdatePublication({ publications }: Deps) {
  return async function updatePublication(id: string, publication: Omit<Publication, "id" | "author">, newAuthorId?: string) {
    await publications.updateById(id, publication, newAuthorId);
  };
}
