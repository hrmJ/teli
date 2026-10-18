export type ReceptionType =
  | "translation"
  | "adaptation"
  | "review"
  | "other"
  | "article";

const receptionCategories = {
  translation: "translations",
  adaptation: "adaptations",
  review: "reviews",
  article: "articles",
  other: "other",
} as const satisfies Record<ReceptionType, string>;

export function receptionTypeAsCategory(type: ReceptionType) {
  return receptionCategories[type];
}
