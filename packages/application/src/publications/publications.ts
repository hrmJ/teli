import type { PublicationRepository } from "./publicationRepository.ts";
import {
  type ReceptionType,
  receptionTypeAsCategory,
} from "@teli/domain/receptions";

type Deps = {
  publications: PublicationRepository;
};

export type GetPublications = ReturnType<typeof composeGetPublications>;
export type GetPublicationById = ReturnType<typeof composeGetPublicationById>;
export type AddPublicationReceptions = ReturnType<
  typeof composeAddPublicationReceptions
>;

export function composeGetPublications({ publications }: Deps) {
  return async function getPublications(title: string) {
    const matchingPublications = await publications.searchByTitle(title);
    return { publications: matchingPublications };
  };
}

export function composeGetPublicationById({ publications }: Deps) {
  return async function getPublications(id: string) {
    const publication = await publications.getById(id);
    return { publication };
  };
}

export function composeAddPublicationReceptions({ publications }: Deps) {
  return async function addPublicationReceptions(
    targetId: string,
    receptionType: ReceptionType,
    existingPublicationId?: string,
  ) {
    const targetPublication = await publications.getById(targetId);
    const receptionCategory = receptionTypeAsCategory(receptionType);
    const existingPublication = existingPublicationId
      ? await publications.getById(existingPublicationId)
      : null;

    if (!targetPublication) {
      throw new Error("Unable to find target publication");
    }

    const receptions = targetPublication.receptions ?? {
      translations: [],
      adaptations: [],
      articles: [],
      reviews: [],
      other: [],
    };

    if (existingPublication) {
      const receptionOf = existingPublication?.receptionOf ?? [];
      const updatedReceptionOf = [...receptionOf, targetId];
      await publications.updateById(existingPublication.id, {
        ...existingPublication,
        receptionOf: updatedReceptionOf,
      });
    }

    const updatedReceptions = {
      ...receptions,
      [receptionCategory]: [
        ...receptions[receptionCategory],
        existingPublicationId,
      ],
    };
    await publications.updateById(targetId, {
      ...targetPublication,
      receptions: updatedReceptions,
    });
  };
}
