import { escapeRegex } from "@teli/language";
import type { AuthorModel } from "./author.schema.ts";
import { publicationToDomain, publicationToPersistence } from "./publication.mapper.ts";
import type { PublicationRepository } from "@teli/application/publications";
import type { Publication } from "@teli/domain/publications";
import { receptionTypeAsCategory, type ReceptionType } from "@teli/domain/receptions";

type AuthorModelLike = {
  find: typeof AuthorModel.find;
  findOne: typeof AuthorModel.findOne;
  findById: typeof AuthorModel.findById;
  aggregate: typeof AuthorModel.aggregate;
  findByIdAndUpdate: typeof AuthorModel.findByIdAndUpdate;
};

type Deps = {
  AuthorModel: AuthorModelLike;
};

export function composeMongoosePublicationRepository(deps: Deps): PublicationRepository {
  return {
    async getById(id) {
      const author = await deps.AuthorModel.findOne({
        "publications._id": id,
      });
      const publication = author?.publications.id(id);
      if (!publication) {
        return null;
      }
      return publicationToDomain(publication, author?.name);
    },

    async getByIds(ids) {
      if (!ids) return [];
      const idSet = new Set(ids.map((id) => id.toString()));

      const authors = await deps.AuthorModel.find({
        "publications._id": { $in: ids },
      }).lean();

      return authors.flatMap((author) =>
        author.publications
          .filter((publication) => idSet.has(publication._id.toString()))
          .map((pub) => publicationToDomain(pub, author.name)),
      );
    },

    async updateReceptionsOfById(publicationId: string, receptionOf: string[]) {
      const author = await deps.AuthorModel.findOne({
        "publications._id": publicationId,
      });
      if (!author) throw new Error("Unable to find author for publication");

      const publication = author.publications.id(publicationId);

      if (!publication) {
        throw new Error("Unable to find the publication to update");
      }

      publication.set({ receptionOf });

      await author.save();

      return true;
    },

    async updateReceptionsById(publicationId: string, receptionIdsByType: string[], receptionType: ReceptionType) {
      const author = await deps.AuthorModel.findOne({
        "publications._id": publicationId,
      });
      if (!author) throw new Error("Unable to find author for publication");

      const publication = author.publications.id(publicationId);

      if (!publication) {
        throw new Error("Unable to find the publication to update");
      }

      const category = receptionTypeAsCategory(receptionType);

      if (!publication?.receptions) return false;
      if (!publication?.receptions[category]) return false;

      const receptions = { ...publication.receptions, [category]: receptionIdsByType };

      publication.set({ receptions });

      await author.save();

      return true;
    },

    async updateById(publicationId: string, updatedPublication: Omit<Publication, "id" | "author">) {
      const author = await deps.AuthorModel.findOne({
        "publications._id": publicationId,
      });
      if (!author) throw new Error("Unable to find author for publication");

      const publication = author.publications.id(publicationId);

      if (!publication) {
        throw new Error("Unable to find the publication to update");
      }

      publication.set(publicationToPersistence(updatedPublication));

      await author.save();

      return true;
    },

    async searchByTitle(title: string): Promise<Publication[]> {
      const authors = await deps.AuthorModel.find({
        "publications.title": {
          $regex: escapeRegex(title),
          $options: "i",
        },
      });

      return authors.flatMap((author) =>
        author.publications
          .filter((publication) => publication.title?.toLowerCase().includes(title.toLowerCase()))
          .map((pub) => {
            return publicationToDomain(pub, author.name);
          }),
      );
    },

    async create(publication, authorId) {
      const author = await deps.AuthorModel.findById(authorId);

      if (!author) {
        throw new Error("Author not found");
      }

      author.publications.push(publicationToPersistence({ ...publication }));

      await author.save();
      const created = author.publications.at(-1)!;
      return publicationToDomain(created);
    },
  };
}
