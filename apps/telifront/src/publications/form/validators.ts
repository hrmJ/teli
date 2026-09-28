export function validateAuthor(
  authorMap: Map<string, { name: string; id: string }>,
  author: unknown,
) {
  console.log("VALIDATING 🎠");
  if (typeof author !== "string") return;
  if (authorMap.has(author)) return;
  return "Tekijää ei löydy";
}
