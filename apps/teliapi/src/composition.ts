import {
  composeGetAuthorDetails,
  composeGetAuthorIndex,
  composeListAuthors,
} from "@teli/application/authors";
import {
  AuthorModel,
  composeMongooseAuthorRepository,
  composeMongoosePublicationRepository,
} from "@teli/infrastructure/mongoose";
import { composeAuthorsController } from "./authors/authors.controller.ts";
import { composePublicationsController } from "./publications/publications.controller.ts";
import { composeGetReceptions } from "@teli/application/publications";

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
