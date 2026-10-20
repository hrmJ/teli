export interface AuthorForm {
  firstName: string;
  lastName: string;
}

export type AuthorFormAction =
  | { type: "editFirstName"; firstName: string }
  | { type: "editLastName"; lastName: string };

export function authorFormReducer(
  state: AuthorForm,
  action: AuthorFormAction,
): AuthorForm {
  switch (action.type) {
    case "editFirstName":
      return { ...state, firstName: action.firstName };
    case "editLastName":
      return { ...state, firstName: action.lastName };
    default:
      return state;
  }
}
