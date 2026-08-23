import { LanguageIcon } from "@heroicons/react/24/solid";
import { css } from "../../styled-system/css";

interface Props {
  language?: string;
}

export function PublicationLanguage({ language }: Props) {
  if (!language) return null;
  return (
    <div
      className={css({
        display: "flex",
        gap: "s1",
        alignItems: "center",
      })}
    >
      <LanguageIcon className={css({ width: "s3", height: "s3" })} />
      <p>{language}</p>
    </div>
  );
}
