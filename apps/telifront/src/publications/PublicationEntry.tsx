import { css } from "../../styled-system/css";

interface Props {
  value?: string | number | Date;
  label: string;
}

export function PublicationEntry(props: Props) {
  if (!props.value) return;
  return (
    <li
      className={css({
        display: "flex",
        fontSize: "s3",
        alignItems: "center",
      })}
    >
      <div className={css({ color: "grey5", width: "s11" })}>
        {props.label}:
      </div>
      <div className={css({ color: "grey3" })}>{props.value.toString()}</div>
    </li>
  );
}
