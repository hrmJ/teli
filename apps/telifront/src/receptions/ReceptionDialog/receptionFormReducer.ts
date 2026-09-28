import {
  NewPublicationDto,
  PublicationDto,
} from "@teli/contracts/publications";
import * as v from "valibot";

function validatePublication(data: unknown) {
  const parsed = v.safeParse(NewPublicationDto, data);
  if (!parsed.success) {
    console.log(parsed.issues);
    throw new Error("Invalid reception data");
  }
  return parsed.output;
}

export type ReceptionType =
  | "translation"
  | "review"
  | "adaptation"
  | "article"
  | "other";

export interface ReceptionForm {
  receptionType: ReceptionType;
  newPublication?: Record<string, unknown>;
  existingPublication?: { title: string; id: string };
  createNewPublication: boolean;
  newOrExistingPublication: "new" | "existing";
}

export type ReceptionFormAction =
  | { type: "editType"; receptionType: ReceptionType }
  | { type: "existingPublicationAsReception"; id: string; title: string }
  | { type: "newPublicationAsReception"; publication: PublicationDto }
  | { type: "clearExistingPublication" }
  | {
      type: "updateNewPublicationField";
      field: string;
      value: unknown;
    }
  | { type: "useNewOrExistingPublication"; newOrExisting: "new" | "existing" };

export function receptionFormReducer(
  state: ReceptionForm,
  action: ReceptionFormAction,
): ReceptionForm {
  switch (action.type) {
    case "editType":
      return { ...state, receptionType: action.receptionType };
    case "newPublicationAsReception":
      return { ...state, newPublication: action.publication };
    case "existingPublicationAsReception":
      return {
        ...state,
        existingPublication: { id: action.id, title: action.title },
      };
    case "useNewOrExistingPublication":
      return { ...state, newOrExistingPublication: action.newOrExisting };
    case "clearExistingPublication":
      return { ...state, existingPublication: undefined };
    case "updateNewPublicationField":
      const newPublication = validatePublication({
        ...state.newPublication,
        [action.field]: action.value,
      });
      return { ...state, newPublication };
    default:
      return state;
  }
}
