import type { AuthorIndexDto } from "@teliapi/contracts/authors";
import type { GetAuthorIndex } from "@teliapi/application/authors";

type AuthorIndexResult = Awaited<ReturnType<GetAuthorIndex>>;

export function presentAuthorIndex(result: AuthorIndexResult): AuthorIndexDto {
  return {
    letters: result.letters,
  };
}
