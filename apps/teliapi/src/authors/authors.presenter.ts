import type {
  AuthorDetailsDto,
  AuthorIndexDto,
  AuthorListItemDto,
} from "@teliapi/contracts/authors";
import type {
  GetAuthorDetails,
  GetAuthorIndex,
  ListAuthors,
} from "@teliapi/application/authors";

type AuthorIndexResult = Awaited<ReturnType<GetAuthorIndex>>;
type AuthorDetailsResult = Awaited<ReturnType<GetAuthorDetails>>;
type AuthorListResult = Awaited<ReturnType<ListAuthors>>;

export function presentAuthorIndex(result: AuthorIndexResult): AuthorIndexDto {
  return {
    letters: result.letters,
  };
}

export function presentAuthorDetails(
  result: AuthorDetailsResult,
): AuthorDetailsDto {
  if (!result) throw new Error("Invalid author entry");
  return {
    id: result.id,
    name: result.name,
    biographicalDetails: result.biographicalDetails,
    country: result.country,
    language: result.language,
    professionalDetails: result.professionalDetails,
    pseudonyms: result.pseudonyms,
    yearOfBirth: result.yearOfBirth,
    yearOfDeath: result.yearOfDeath,
  };
}

export function presentAuthorList(
  result: AuthorListResult,
): AuthorListItemDto[] {
  return result.map((entry) => ({
    name: entry.name,
  }));
}
