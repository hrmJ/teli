import {
  composeAddPublication,
  composeCreateAuthor,
  composeDeleteAuthor,
  composeGetAuthorById,
  composeGetAuthorDetails,
  composeGetAuthorIndex,
  composeListAuthorNames,
  composeListAuthors,
} from "@teli/application/authors";
import { AuthorModel, composeMongooseAuthorRepository, composeMongoosePublicationRepository } from "@teli/infrastructure/mongoose";
import { composeAuthorsController } from "./authors/authors.controller.ts";
import { composePublicationsController } from "./publications/publications.controller.ts";
import {
  composeAddPublicationReceptions,
  composeGetPublicationById,
  composeGetPublications,
  composeGetReceptions,
} from "@teli/application/publications";

const authorRepository = composeMongooseAuthorRepository({ AuthorModel });
const publicationRepository = composeMongoosePublicationRepository({
  AuthorModel,
});

export const authorsController = composeAuthorsController({
  getAuthorIndex: composeGetAuthorIndex({ authors: authorRepository }),
  getAuthorDetails: composeGetAuthorDetails({ authors: authorRepository }),
  listAuthors: composeListAuthors({ authors: authorRepository }),
  listAuthorNames: composeListAuthorNames({ authors: authorRepository }),
  createAuthor: composeCreateAuthor({ authors: authorRepository }),
  deleteAuthor: composeDeleteAuthor({ authors: authorRepository }),
});

export const publicationsController = composePublicationsController({
  getReceptions: composeGetReceptions({ publications: publicationRepository }),
  getPublications: composeGetPublications({ publications: publicationRepository }),
  getById: composeGetPublicationById({ publications: publicationRepository }),
  addPublicationReception: composeAddPublicationReceptions({ publications: publicationRepository }),
  getAuthorById: composeGetAuthorById({ authors: authorRepository }),
  addPublication: composeAddPublication({ authors: authorRepository }),
});
