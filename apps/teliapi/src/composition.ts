import {
  composeGetAuthorDetails,
  composeGetAuthorIndex,
  composeListAuthors,
} from "@teliapi/application/authors";
import {
  AuthorModel,
  composeMongooseAuthorRepository,
  composeMongoosePublicationRepository,
} from "@teliapi/infrastructure/mongoose";
import { composeAuthorsController } from "./authors/authors.controller.ts";
import { composePublicationsController } from "./publications/publications.controller.ts";
import { composeGetReceptions } from "@teliapi/application/publications";

const authorRepository = composeMongooseAuthorRepository({ AuthorModel });
const publicationRepository = composeMongoosePublicationRepository({
  AuthorModel,
});
export const authorsController = composeAuthorsController({
  getAuthorIndex: composeGetAuthorIndex({ authors: authorRepository }),
  getAuthorDetails: composeGetAuthorDetails({ authors: authorRepository }),
  listAuthors: composeListAuthors({ authors: authorRepository }),
});

export const publicationsController = composePublicationsController({
  getReceptions: composeGetReceptions({ publications: publicationRepository }),
});
