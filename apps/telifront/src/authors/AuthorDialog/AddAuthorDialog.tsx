import { useState } from "react";
import { css } from "../../../styled-system/css";
import { iconBtn } from "../../styles/button";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Dialog } from "../../components/Dialog";
import { AddAuthorForm } from "../form/AddAuthorForm";
import { keycloak } from "../../auth/keycloak";

export function AddAuthorDialog() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {keycloak.authenticated ? (
        <button
          onClick={() => setIsOpen(true)}
          className={css(iconBtn, {
            color: "yellow.600",
            fontSize: "s2",
            marginTop: "s4",
            padding: "s2",
            paddingLeft: "0",
          })}
        >
          <UserPlusIcon className={css({ width: "s3", height: "s3" })} />
          <div>Lisää tekijä</div>
        </button>
      ) : null}
      {isOpen ? (
        <Dialog
          close={() => setIsOpen(false)}
          styles={css.raw({
            width: "s18",
            maxHeight: "80vh",
            overflow: "auto",
          })}
        >
          <AddAuthorForm
            onSuccess={() => {
              setIsOpen(false);
            }}
          />
        </Dialog>
      ) : null}
    </>
  );
}
