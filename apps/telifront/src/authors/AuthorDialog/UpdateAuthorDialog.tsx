import { useState } from "react";
import { css } from "../../../styled-system/css";
import { iconBtn } from "../../styles/button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Dialog } from "../../components/Dialog";
import { keycloak } from "../../auth/keycloak";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../../components/Spinner";
import { AddAuthorForm } from "../form/AddAuthorForm";
import type { AuthorDto, NewAuthorDto } from "@teli/contracts/authors";
import { updateAuthor } from "../api";

export function UpdateAuthorDialog({ author }: { author?: AuthorDto }) {
  if (!author?.name) return;

  const [isOpen, setIsOpen] = useState(false);

  const [lastName, firstName] = author.name.split(/\s+/).map((name) => name.trim());

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (updatedAuthor: NewAuthorDto) => {
      return updateAuthor(updatedAuthor, author.id);
    },
    onSuccess: (_, up) => {
      queryClient.invalidateQueries({ queryKey: ["authorIndex"] });
      queryClient.invalidateQueries({ queryKey: ["authorDetails"] });
      queryClient.invalidateQueries({ queryKey: ["authorDetails", `${up.lastName} ${up.firstName}`] });
      queryClient.invalidateQueries({ queryKey: ["authorDetails", author.name] });
      navigate({ to: `/author/$author`, params: { author: `${up.lastName} ${up.firstName}` } });
      setIsOpen(false);
    },
  });

  if (mutation.isPending) {
    return <Spinner />;
  }

  return (
    <>
      {keycloak.authenticated ? (
        <button
          onClick={() => setIsOpen(true)}
          className={css(iconBtn, {
            color: "yellow.600",
            fontSize: "s2",
            padding: "s2",
            paddingLeft: "0",
          })}
        >
          <PencilIcon className={css({ width: "s3", height: "s3" })} />
          <div>Muokkaa tekijää</div>
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
          {mutation.isError ? (
            <div className={css({ fontSize: "s3", padding: "s3", borderRadius: "sm", background: "rose.100", marginBottom: "s2" })}>
              Päivitys epäonnistui.
            </div>
          ) : null}
          <AddAuthorForm
            firstName={firstName}
            lastName={lastName}
            onSuccess={() => setIsOpen(false)}
            otherProps={author}
            originalName={author.name}
            isEdit
            mutationFn={mutation}
          />
        </Dialog>
      ) : null}
    </>
  );
}
