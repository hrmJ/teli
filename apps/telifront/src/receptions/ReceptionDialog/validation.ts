import { NewPublicationDtoSchema } from "@teli/contracts/publications";
import { type ReceptionType, type ReceptionForm } from "./receptionFormReducer";
import * as v from "valibot";

function validateStep1(receptionType?: ReceptionType) {
  if (receptionType) return;
  return ["Lisää reseption tyyppi."];
}

function validateStep2(
  data: ReceptionForm,
  authorMap: Map<string, { name: string; id: string }>,
) {
  if (data.newOrExistingPublication === "new") {
    const parsed = v.safeParse(NewPublicationDtoSchema, data.newPublication);
    if (!parsed.success) {
      console.log(
        parsed.issues.map((iss) => iss.message),
        parsed,
      );
      return ["Tarkista uuden teoksen tiedot."];
    }
    if (!authorMap.has(parsed.output.author)) {
      return ["Uudelta teokselta puuttuu tekijä tai tekijää ei löydy"];
    }
    return;
  }

  if (!data.existingPublication?.id) {
    return ["Valitse olemassaoleva teos tai lisää uusi."];
  }
}

export function validateStep(
  step: number,
  data: ReceptionForm,
  authorMap: Map<string, { name: string; id: string }>,
): string[] | undefined {
  if (step === 0) {
    return validateStep1(data.receptionType);
  }
  if (step === 1) {
    return validateStep2(data, authorMap);
  }
}
