import { composeGetAuthorIndex } from "@teliapi/application/authors";
import {
  AuthorModel,
  composeMongooseAuthorRepository,
} from "@teliapi/infrastructure/mongoose";
import { composeAuthorsController } from "./authors/authors.controller.ts";

const authorRepository = composeMongooseAuthorRepository({ AuthorModel });
export const authorsController = composeAuthorsController({
  getAuthorIndex: composeGetAuthorIndex({ authors: authorRepository }),
});
