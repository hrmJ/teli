import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { css } from "../../styled-system/css";
import { iconBtnPill } from "../styles/button";

interface Props {
  placeholder?: string;
  advance: () => void;
  validate: () => boolean;
  steps: unknown[];
  activeStep: number;
}

export function NextStep(props: Props) {
  if (props.activeStep > props.steps.length - 1) return;
  return (
    <button
      className={css(iconBtnPill, { fontSize: "s3" })}
      onClick={(e) => {
        e.preventDefault();
        props.advance();
      }}
      disabled={true}
    >
      Jatka
      <ArrowRightIcon className={css({ width: "s4", height: "s4" })} />
    </button>
  );
}
