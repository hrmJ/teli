import { type AuthorRepository } from "@teliapi/application/authors";
import type { AuthorModel } from "./author.schema.ts";

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
            _id: { $toUpper: { $substr: ["$name", 0, 1] } },
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

      return letters.map((item) => item.letter);
    },
  };
}
