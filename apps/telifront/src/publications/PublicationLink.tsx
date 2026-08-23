import { LinkIcon } from "@heroicons/react/24/solid";
import { css } from "../../styled-system/css";

interface Props {
  value?: string;
}

export function PublicationLink(props: Props) {
  if (!props.value) return;
  return (
    <div
      className={css({
        display: "flex",
        gap: "s1",
        alignItems: "center",
      })}
    >
      <LinkIcon className={css({ width: "s3", height: "s3" })} />
      <p
        className={css({
          maxWidth: "s15",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        })}
      >
        <a href={props.value}>{props.value}</a>
      </p>
    </div>
  );
}
