import { css } from "../../styled-system/css";

interface Props {
  publisher?: string;
  publishLocation?: string;
}

export function Publisher({ publisher, publishLocation }: Props) {
  if (!publisher && !publishLocation) return null;
  if (!publisher && publishLocation) return <span>{publishLocation}</span>;
  const locationFormatted = publishLocation ? `. ${publishLocation}` : "";
  return (
    <span className={css({ paddingLeft: "s2" })}>
      {publisher?.trim()}
      {locationFormatted}
    </span>
  );
}
