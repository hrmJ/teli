import { useState } from "react";
import { LinkIcon } from "@heroicons/react/16/solid";
import { css } from "../../../styled-system/css";
import { Dialog } from "../../components/Dialog";
import { iconBtn } from "../../styles/button";
import { AddReceptionForm } from "./AddReceptionForm";

interface Props {
  to: string;
}

export function AddReceptionDialog({ to }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={css(iconBtn, {
          color: "yellow.600",
          fontSize: "s2",
          marginTop: "s4",
          padding: "s2",
        })}
      >
        <LinkIcon className={css({ width: "s3", height: "s3" })} />
        <div>Lisää reseptio</div>
      </button>
      {isOpen ? (
        <Dialog
          close={() => setIsOpen(false)}
          styles={css.raw({ width: "s18" })}
        >
          <AddReceptionForm to={to} />
        </Dialog>
      ) : null}
    </>
  );
}
