import type { AuthorRepository } from "@teli/application/authors";
import { AuthorModel } from "./author.schema.ts";
import { authorToDomain, authorToDomainWithoutPublication, authorToPersistence } from "./author.mapper.ts";
import type { Author } from "@teli/domain/authors";
import type { Publication } from "@teli/domain/publications";
import { publicationToPersistence } from "./publication.mapper.ts";

type AuthorModelLike = {
  find: typeof AuthorModel.find;
  findOne: typeof AuthorModel.findOne;
  findById: typeof AuthorModel.findById;
  aggregate: typeof AuthorModel.aggregate;
  create: typeof AuthorModel.create;
  findByIdAndDelete: typeof AuthorModel.findByIdAndDelete;
};

type Deps = {
  AuthorModel: AuthorModelLike;
};

export function composeMongooseAuthorRepository(deps: Deps): AuthorRepository {
  return {
    async listLetters() {
      const letters = await deps.AuthorModel.aggregate([
        {
          $group: {
            _id: { $toUpper: { $substrCP: ["$name", 0, 1] } },
          },
        },
        {
          $project: {
            _id: 0,
            letter: "$_id",
          },
        },
        {
          $sort: { letter: 1 },
        },
      ]);

      return letters.map((item) => item.letter).filter((item) => item.trim());
    },

    async getDetails(name: string) {
      const document = await deps.AuthorModel.findOne({ name });

      if (!document) {
        return null;
      }

      return authorToDomain(document);
    },

    async list(by) {
      if (!by.letter) {
        throw new Error("Authors can only be listed by letter");
      }

      const authors = await deps.AuthorModel.find({
        name: { $regex: `^${by.letter}`, $options: "i" },
      }).sort({ name: 1 });

      return authors.map(authorToDomain);
    },

    async listAllNames() {
      const authors = await deps.AuthorModel.find({}).sort({ name: 1 });
      return authors.map(authorToDomainWithoutPublication);
    },

    async create(author: Omit<Author, "id" | "publications">): Promise<Author> {
      const created = await deps.AuthorModel.create(authorToPersistence(author));
      return authorToDomain(created);
    },

    async getById(id: string) {
      const author = await deps.AuthorModel.findById(id);
      if (!author) {
        return null;
      }
      return authorToDomain(author);
    },

    async addPublication(id: string, publication: Omit<Publication, "id" | "author">) {
      const author = await deps.AuthorModel.findById(id);
      author?.publications.push(publicationToPersistence({ ...publication, author: author.name }));
      await author?.save();
      return true;
    },

    async delete(id: string) {
      await deps.AuthorModel.findByIdAndDelete({ _id: id });
      return true;
    },
  };
}
