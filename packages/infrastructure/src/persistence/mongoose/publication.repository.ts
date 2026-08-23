import type { AuthorModel } from "./author.schema.ts";
import { publicationToDomain } from "./publication.mapper.ts";
import type { PublicationRepository } from "@teliapi/application/publications";
import type { PublicationModel } from "./publication.schema.ts";

type AuthorModelLike = {
  find: typeof AuthorModel.find;
  findOne: typeof AuthorModel.findOne;
  aggregate: typeof AuthorModel.aggregate;
};

type Deps = {
  AuthorModel: AuthorModelLike;
};

export function composeMongoosePublicationRepository(
  deps: Deps,
): PublicationRepository {
  return {
    async getById(id) {
      const author = await deps.AuthorModel.findOne({
        "publications._id": id,
      });
      const publication = author?.publications.id(id);
      if (!publication) {
        return null;
      }
      return publicationToDomain(publication);
    },
    async getByIds(ids) {
      const idSet = new Set(ids.map((id) => id.toString()));

      const authors = await deps.AuthorModel.find({
        "publications._id": { $in: ids },
      }).lean();

      return authors.flatMap((author) =>
        author.publications
          .filter((publication) => idSet.has(publication._id.toString()))
          .map(publicationToDomain),
      );
    },
  };
}
