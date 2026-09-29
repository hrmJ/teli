import { ArrowDownIcon } from "@heroicons/react/24/solid";
import { css } from "../../../styled-system/css";
import { ReceptionForm } from "./receptionFormReducer";

interface Props {
  data: ReceptionForm;
  to: string;
}

function formatTitle(data: ReceptionForm) {
  if (data.newOrExistingPublication === "existing") {
    return data.existingPublication?.title;
  }
  const title =
    typeof data.newPublication?.title === "string"
      ? data.newPublication.title
      : "?";
  return title;
}

const translations = {
  translation: "Käännös",
  adaptation: "Adaptaatio",
  review: "Arvostelu",
  other: "Muu",
  article: "Artikkeli",
};

export function Summary({ data, to }: Props) {
  {
    return (
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "s1",
          color: "grey4",
          flexDir: "column",
          padding: "s4",
        })}
      >
        <div>{to}</div>
        <ArrowDownIcon className={css({ width: "s6", height: "s6" })} />
        <div>{translations[data.receptionType]}</div>
        <ArrowDownIcon className={css({ width: "s6", height: "s6" })} />
        <div className={css({})}>{formatTitle(data)}</div>
      </div>
    );
  }
}
