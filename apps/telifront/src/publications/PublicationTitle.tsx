import { css } from "../../styled-system/css";
import { type DisplayAs } from "../utils/sharedTypes";
import { Publisher } from "./Publisher";

interface Props {
  title?: string;
  year?: string | number;
  onClick: () => void;
  publisherDetails: { publisher?: string; publishLocation?: string };
  displayAs: DisplayAs;
}

export function PublicationTitle({
  title,
  year,
  onClick,
  publisherDetails,
  displayAs,
}: Props) {
  const yearFormatted = year !== undefined ? ` ${year}.` : "";
  return (
    <div
      onClick={onClick}
      className={css({
        display: "flex",
        alignItems: "center",
      })}
    >
      <button
        className={css({
          width: "50%",
          fontSize: "s5",
          fontWeight: displayAs === "original" ? "s2" : "normal",
          display: "inline-block",
          textAlign: "start",
          color: displayAs === "original" ? "grey3" : "grey4",
          cursor: "pointer",
          _hover: {
            textDecoration: "underline",
          },
        })}
      >
        {title}
      </button>
      <div
        className={css({ color: displayAs === "original" ? "grey4" : "grey5" })}
      >
        {publisherDetails.publisher || publisherDetails.publishLocation
          ? " "
          : ""}
        <Publisher {...publisherDetails} />
        {yearFormatted}
      </div>
    </div>
  );
}
