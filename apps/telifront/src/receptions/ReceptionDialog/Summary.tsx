import { ArrowRightIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { css } from "../../../styled-system/css";
import { ReceptionForm } from "./receptionFormReducer";
import { iconBtn, iconBtnPill } from "../../styles/button";

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
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "s1",
        color: "grey4",
      })}
    >
      <div>{to}</div>
      <ArrowRightIcon className={css({ width: "s4", height: "s4" })} />
      <div>
        {formatTitle(data)} ({translations[data.receptionType]})
      </div>
    </div>
  );
}
