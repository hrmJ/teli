import { escapeRegex } from "@teli/language";
import type { AuthorModel } from "./author.schema.ts";
import { publicationToDomain, publicationToPersistence } from "./publication.mapper.ts";
import type { PublicationRepository } from "@teli/application/publications";
import type { Publication } from "@teli/domain/publications";
import { receptionTypeAsCategory, type ReceptionType } from "@teli/domain/receptions";
import type { PublicationDocument } from "./publication.schema.ts";

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

    async updateById(publicationId: string, updatedPublication: Omit<Publication, "id" | "author">, newAuthorId?: string) {
      const author = await deps.AuthorModel.findOne({
        "publications._id": publicationId,
      });
      if (!author) throw new Error("Unable to find author for publication");

      const publication = author.publications.id(publicationId);

      if (!publication) {
        throw new Error("Unable to find the publication to update");
      }

      publication.set(publicationToPersistence(updatedPublication));

      if (newAuthorId && newAuthorId !== author.id) {
        // Moving into another author
        const newAuthor = await deps.AuthorModel.findById(newAuthorId);
        if (!newAuthor) {
          throw new Error("Invalid new author given");
        }

        newAuthor.publications.push({
          ...publication.toObject(),
          // Note: preserve old pub's id to make sure references stay
          _id: publication._id,
        });

        publication.deleteOne();

        await newAuthor.save();
      }

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

    async searchByQuery(query: string): Promise<string[]> {
      const fields: (keyof PublicationDocument)[] = ["title", "english title", "other authors", "publication name", "publisher"];

      const regex = { $regex: escapeRegex(query), $options: "i" };
      const matches = fields.map((field) => ({ [`publications.${field}`]: regex }));
      const authors = await deps.AuthorModel.find({ $or: matches });
      const pattern = new RegExp(escapeRegex(query), "i");

      return authors.flatMap((author) =>
        author.publications
          .filter((publication) => fields.some((field) => pattern.test(publication.get(field) ?? "")))
          .map((pub) => pub._id.toString()),
      );
    },

    async filterByReceptionType(publicationIds: string[], types: ReceptionType[], originals: boolean): Promise<string[]> {
      if (!publicationIds.length) return [];
      if (originals) {
        const publications = await this.getByIds(publicationIds);
        return publications.filter((pub) => !pub.receptionOf?.length).map((pub) => pub.id);
      }

      if (!types.length) return [];

      const idSet = new Set(publicationIds);
      const categories = types.map(receptionTypeAsCategory);
      const authors = await deps.AuthorModel.find({
        $or: categories.map((category) => ({
          [`publications.receptions.${category}`]: {
            $in: publicationIds,
          },
        })),
      });

      const matchingIds = new Set<string>();

      // A clear potential perf bottleneck with O^n

      for (const author of authors) {
        for (const publication of author.publications) {
          for (const category of categories) {
            for (const id of publication.receptions?.[category] ?? []) {
              if (idSet.has(id)) {
                matchingIds.add(id);
              }
            }
          }
        }
      }

      return publicationIds.filter((id) => matchingIds.has(id));
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

    async deleteById(id: string) {
      const author = await deps.AuthorModel.findOne({
        "publications._id": id,
      });
      if (!author) {
        throw new Error("Invalid publication to delete: no author found");
      }
      const publication = author?.publications.id(id);
      await publication?.deleteOne();
      await author.save();
      return true;
    },
  };
}
