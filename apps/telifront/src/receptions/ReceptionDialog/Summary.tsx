import { ArrowDownIcon, ArrowRightCircleIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
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
  const title = typeof data.newPublication?.title === "string" ? data.newPublication.title : "Reseptio ilman otsikkoa";
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
          alignItems: "start",
          gap: "s2",
          color: "grey4",
          flexDir: "column",
          padding: "s4",
        })}
      >
        <div className={css({ border: "1px solid", borderColor: "grey5", padding: "s2", borderRadius: "sm" })}>{to}</div>
        <div className={css({ paddingLeft: "s3" })}>
          <EllipsisHorizontalIcon
            className={css({ width: "s6", height: "s6", transform: "rotate(45deg) scaleX(3)", color: "yellow.600" })}
          />
        </div>
        <div className={css({ marginLeft: "s8", border: "1px solid", borderColor: "grey5", padding: "s2", borderRadius: "sm" })}>
          <span className={css({ color: "yellow.600" })}> {translations[data.receptionType]}</span>: {formatTitle(data)}
        </div>
      </div>
    );
  }
}
