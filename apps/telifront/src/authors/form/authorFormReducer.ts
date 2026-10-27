import { NewAuthorDto } from "@teli/contracts/authors";

export interface AuthorForm {
  firstName: string;
  lastName: string;
}

export type AuthorFormAction = {
  type: "updateAuthorField";
  field: string;
  value: unknown;
};

export function authorFormReducer(
  state: NewAuthorDto,
  action: AuthorFormAction,
): NewAuthorDto {
  switch (action.type) {
    case "updateAuthorField":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}
