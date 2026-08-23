import { type PublicationRepository } from "./publicationRepository.ts";

type Deps = {
  publications: PublicationRepository;
};

export type GetReceptions = ReturnType<typeof composeGetReceptions>;

export function composeGetReceptions({ publications }: Deps) {
  return async function getReceptions(id: string) {
    const parent = await publications.getById(id);
    if (!parent?.receptions) return;
    const [translations, adaptations, articles, reviews, other] =
      await Promise.all([
        publications.getByIds(parent.receptions.translations),
        publications.getByIds(parent.receptions.adaptations),
        publications.getByIds(parent.receptions.articles),
        publications.getByIds(parent.receptions.reviews),
        publications.getByIds(parent.receptions.other),
      ]);
    console.log({ translations, adaptations, articles, reviews, other });
    return { translations, adaptations, articles, reviews, other };
  };
}
