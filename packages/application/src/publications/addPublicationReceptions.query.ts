import { type Publication } from "@teli/domain/publications";
import type { PublicationRepository } from "./publicationRepository.ts";
import { type ReceptionType, receptionTypeAsCategory } from "@teli/domain/receptions";

type Deps = {
  publications: PublicationRepository;
};

export type GetPublications = ReturnType<typeof composeGetPublications>;
export type GetPublicationById = ReturnType<typeof composeGetPublicationById>;
export type AddPublicationReceptions = ReturnType<typeof composeAddPublicationReceptions>;

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

/**
 * Form the new receptionsOf dictionary with the updated target publication
 * included
 */
function withUpdatedReceptionsOf(reception: Publication, targetId: string): Publication {
  const receptionOf = reception?.receptionOf ?? [];
  const updatedReceptionOf = [...receptionOf, targetId];
  return {
    ...reception,
    receptionOf: [...new Set(updatedReceptionOf)],
  };
}

/**
 * Form the new receptions dictionary with the updated receptions
 * and return the whole target publication
 *
 */
function withUpdatedReceptions(
  reception: Publication,
  targetPublication: Publication,
  receptionCategory: ReturnType<typeof receptionTypeAsCategory>,
): Publication {
  const receptions = targetPublication.receptions ?? {
    translations: [],
    adaptations: [],
    articles: [],
    reviews: [],
    other: [],
  };

  return {
    ...targetPublication,
    receptions: {
      ...receptions,
      [receptionCategory]: [...new Set([...receptions[receptionCategory], reception.id])],
    },
  };
}

type ReceptionSource = {
  existingPublicationId?: string;
  publication?: Omit<Publication, "id" | "author"> & { authorId: string };
};

type AddReceptionArgs = {
  targetId: string;
  receptionType: ReceptionType;
} & ReceptionSource;

export function composeAddPublicationReceptions({ publications }: Deps) {
  /**
   * If this is a new publication, create it first,
   * return that or an existing publication to be used as a reception
   */
  async function resolveReception(args: ReceptionSource) {
    if (args.existingPublicationId) {
      return args.existingPublicationId;
    }
    if (args.publication) {
      const { authorId, ...rest } = args.publication;
      const res = await publications.create(rest, authorId);
      return res.id;
    }
    throw new Error("Didnt receive new or existing publication");
  }

  /**
   *
   * Adds a new or an existing publication as a reception
   * for another publication
   *
   */
  return async function addPublicationReceptions({ targetId, receptionType, ...receptionSource }: AddReceptionArgs) {
    const targetPublication = await publications.getById(targetId);
    const receptionCategory = receptionTypeAsCategory(receptionType);
    const receptionId = await resolveReception(receptionSource);
    const reception = await publications.getById(receptionId);

    if (!reception) {
      throw new Error("Unable to find the reception to link");
    }
    if (!targetPublication) {
      throw new Error("Unable to find the target publication");
    }

    await publications.updateById(receptionId, withUpdatedReceptionsOf(reception, targetId));
    await publications.updateById(targetId, withUpdatedReceptions(reception, targetPublication, receptionCategory));
  };
}
