import { css } from "../../styled-system/css";

interface Props {
  value?: string | number | Date;
  label: string;
}

export function AuthorEntry(props: Props) {
  if (props.value === undefined) return;
  return (
    <li
      className={css({
        display: "flex",
        flexFlow: "column",
        "& + &": {
          marginTop: "s4",
        },
      })}
    >
      <div className={css({ color: "grey5", fontSize: "s4" })}>
        {props.label}:
      </div>
      <div className={css({ color: "grey3", fontSize: "s4" })}>
        {props.value.toString()}
      </div>
    </li>
  );
}
