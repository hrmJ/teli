export { composeMongooseAuthorRepository } from "./author.repository.ts";
export { AuthorModel, type AuthorDocument } from "./author.schema.ts";
export { composeMongoosePublicationRepository } from "./publication.repository.ts";
export {
  PublicationModel,
  type PublicationDocument,
} from "./publication.schema.ts";
export { connectMongoose } from "./connection.ts";
