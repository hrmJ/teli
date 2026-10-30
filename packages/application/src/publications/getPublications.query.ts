import type { PublicationRepository } from "./publicationRepository.ts";

type Deps = {
  publications: PublicationRepository;
};

export type GetPublications = ReturnType<typeof composeGetPublications>;

export function composeGetPublications({ publications }: Deps) {
  return async function getPublications(title: string) {
    const matchingPublications = await publications.searchByTitle(title);
    return { publications: matchingPublications };
  };
}
