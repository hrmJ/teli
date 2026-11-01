import type { ReceptionType } from "@teli/domain/receptions";
import type { PublicationRepository } from "./publicationRepository.ts";

type Deps = {
  publications: PublicationRepository;
};

interface FilterPublicationsArgs {
  query: string;
  receptionTypes?: ReceptionType[];
  originals?: boolean;
}

export type FilterPublications = ReturnType<typeof composeFilterPublications>;

export function composeFilterPublications({ publications }: Deps) {
  return async function filterPublications({ query, receptionTypes, originals }: FilterPublicationsArgs) {
    const idsMatchingQuery = await publications.searchByQuery(query);

    if (originals) {
      const filteredIds = await publications.filterByReceptionType(idsMatchingQuery, [], Boolean(originals));
      const matchingPublications = await publications.getByIds(filteredIds);
      return { publications: matchingPublications };
    }

    if (!receptionTypes?.length) {
      const matchingPublications = await publications.getByIds(idsMatchingQuery);
      return { publications: matchingPublications };
    }

    const filteredIds = await publications.filterByReceptionType(idsMatchingQuery, receptionTypes, Boolean(originals));

    const matchingPublications = await publications.getByIds(filteredIds);
    return { publications: matchingPublications };
  };
}
