import { NewPublicationDtoWithAuthor } from "@teli/contracts/publications";

export type PublicationFormAction =
  | {
      type: "updatePublicationField";
      field: string;
      value: unknown;
    }
  | {
      type: "reset";
    };

export function publicationFormReducer(state: NewPublicationDtoWithAuthor, action: PublicationFormAction): NewPublicationDtoWithAuthor {
  switch (action.type) {
    case "updatePublicationField":
      return { ...state, [action.field]: action.value };
    case "reset":
      return { author: state.author };
    default:
      return state;
  }
}
