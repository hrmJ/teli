import type { PublicationRepository } from "./publicationRepository.ts";

type Deps = {
  publications: PublicationRepository;
};

export type GetPublicationById = ReturnType<typeof composeGetPublicationById>;

export function composeGetPublicationById({ publications }: Deps) {
  return async function getPublications(id: string) {
    const publication = await publications.getById(id);
    return { publication };
  };
}
