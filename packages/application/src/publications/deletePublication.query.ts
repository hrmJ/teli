import type { PublicationRepository } from "./publicationRepository.ts";

type Deps = {
  publications: PublicationRepository;
};

export type DeletePublication = ReturnType<typeof composeDeletePublication>;

export function composeDeletePublication({ publications }: Deps) {
  return async function deletePublication(id: string) {
    await publications.deleteById(id);
    return true;
  };
}
