import { useState } from "react";
import { css } from "../../../styled-system/css";
import { iconBtn, iconBtnPill } from "../../styles/button";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Dialog } from "../../components/Dialog";
import { keycloak } from "../../auth/keycloak";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAuthor } from "../api";
import { Spinner } from "../../components/Spinner";

export function RemoveAuthorDialog({ name, id }: { name: string; id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return deleteAuthor(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authorIndex", "authorDetails"] });
      navigate({ to: `/authors/$letter`, params: { letter: name.charAt(0) } });
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
            color: "grey5",
            fontSize: "s2",
            padding: "s2",
            paddingLeft: "0",
          })}
        >
          <TrashIcon className={css({ width: "s3", height: "s3" })} />
          <div>Poista tekijä</div>
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
          noFooter
        >
          {mutation.isError ? (
            <div className={css({ fontSize: "s3", padding: "s3", borderRadius: "sm", background: "rose.100", marginBottom: "s2" })}>
              Poisto epäonnistui.
            </div>
          ) : null}

          <h2 className={css({ fontSize: "s7", color: "grey3" })}>Poistetaanko?</h2>
          <p className={css({ fontSize: "s3", color: "grey4", marginTop: "s4" })}>
            Tämä toiminto poistaa kokonaan tekjän {name} ja hänen teoksensa
          </p>
          <div className={css({ display: "flex", justifyContent: "right", gap: "s3", alignItems: "center", marginTop: "s7" })}>
            <button
              className={css(iconBtnPill, {
                fontSize: "s4",
                color: "grey1",
                border: "1px solid red",
              })}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Peruuta
            </button>
            <button
              className={css(iconBtnPill, {
                fontSize: "s4",
                background: "grey2",
                color: "white",
              })}
              onClick={() => {
                mutation.mutate(id);
              }}
            >
              Poista
            </button>
          </div>
        </Dialog>
      ) : null}
    </>
  );
}
