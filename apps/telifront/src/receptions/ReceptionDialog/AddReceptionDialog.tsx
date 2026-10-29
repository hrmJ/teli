import { use, useState } from "react";
import { LinkIcon } from "@heroicons/react/16/solid";
import { css } from "../../../styled-system/css";
import { Dialog } from "../../components/Dialog";
import { iconBtn } from "../../styles/button";
import { AddReceptionForm } from "./AddReceptionForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReceptionForm } from "./receptionFormReducer";
import { saveReception } from "../api";
import { AuthorContext } from "../../authors/AuthorContext";
import { keycloak } from "../../auth/keycloak";

interface Props {
  to: string;
  originalId: string;
}

function compileNewPublication(authorMap: Map<string, { id: string; name: string }>, newPublication?: Record<string, unknown>) {
  if (!newPublication?.author) return undefined;
  if (typeof newPublication.author === "string") {
    const authorName = newPublication.author.toLowerCase().trim();
    const { author, ...rest } = newPublication;
    return { authorId: authorMap.get(authorName)?.id, ...rest };
  }
}

export function AddReceptionDialog({ to, originalId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ReceptionForm) => {
      return saveReception(data, originalId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receptions", originalId] });
      setIsOpen(false);
    },
  });

  const { authorMap } = use(AuthorContext);

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
          })}
        >
          <LinkIcon className={css({ width: "s3", height: "s3" })} />
          <div>Lisää reseptio</div>
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
          <AddReceptionForm
            to={to}
            onSave={(data) => {
              mutation.mutate({ ...data, newPublication: compileNewPublication(authorMap, data.newPublication) });
            }}
          />
        </Dialog>
      ) : null}
    </>
  );
}
