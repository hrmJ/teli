export function validateAuthor(
  authorMap: Map<string, { name: string; id: string }>,
  author: unknown,
) {
  if (typeof author !== "string") return;
  if (authorMap.has(author)) return;
  return "Tekijää ei löydy";
}
