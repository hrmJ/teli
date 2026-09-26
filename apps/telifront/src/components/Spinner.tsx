import { css } from "../../styled-system/css";

interface Props {
  enabled?: boolean;
}

export function Spinner({ enabled = true }: Props) {
  if (!enabled) return;
  return (
    <div className={css({ fontSize: "s3", color: "grey5" })}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
