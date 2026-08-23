import { type AuthorRepository } from "@teliapi/application/authors";
import { AuthorModel } from "./author.schema.ts";
import { authorToDomain } from "./author.mapper.ts";

type AuthorModelLike = {
  find: typeof AuthorModel.find;
  aggregate: typeof AuthorModel.aggregate;
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
      const document = await AuthorModel.findOne({ name });

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
  };
}
