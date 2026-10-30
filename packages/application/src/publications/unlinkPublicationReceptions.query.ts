import { receptionTypeAsCategory, type ReceptionType } from "@teli/domain/receptions";
import type { PublicationRepository } from "./publicationRepository.ts";

type Deps = {
  publications: PublicationRepository;
};

export type UnlinkPublicationReceptions = ReturnType<typeof composeUnlinkPublicationReceptions>;

export function composeUnlinkPublicationReceptions({ publications }: Deps) {
  return async function unlinkPublicationReceptions(originalId: string, receptionId: string, receptionType: ReceptionType) {
    const original = await publications.getById(originalId);
    const reception = await publications.getById(receptionId);
    if (reception?.receptionOf) {
      await publications.updateReceptionsOfById(
        originalId,
        reception.receptionOf.filter((id) => id.toString() !== receptionId.toString()),
      );
    }

    const category = receptionTypeAsCategory(receptionType);

    if (Array.isArray(original?.receptions?.[category])) {
      const originalReceptions = original?.receptions?.[category];

      await publications.updateReceptionsById(
        originalId,
        originalReceptions.filter((id) => id.toString() !== receptionId.toString()),
        receptionType,
      );
    }
  };
}
