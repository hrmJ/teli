export function validateNewAuthor(
  authorMap: Map<string, { name: string; id: string }>,
  name: { firstName: unknown; lastName: unknown },
) {
  if (typeof name.firstName !== "string" || typeof name.lastName !== "string") {
    return;
  }
  const firstName = name.firstName.trim().toLowerCase();
  const lastName = name.lastName.trim().toLowerCase();
  if (!authorMap.has(`${lastName} ${firstName}`)) return;
  return "Tekijä on jo olemassa";
}
