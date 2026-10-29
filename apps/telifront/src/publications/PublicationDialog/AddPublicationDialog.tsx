import { useReducer, useState } from "react";
import { css } from "../../../styled-system/css";
import { iconBtn, iconBtnPill } from "../../styles/button";
import { Dialog } from "../../components/Dialog";
import { keycloak } from "../../auth/keycloak";
import { ArrowUpTrayIcon, DocumentPlusIcon } from "@heroicons/react/24/solid";
import { PublicationForm } from "../form/PublicationForm";
import { publicationFormReducer } from "./publicationFormReducer";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewPublicationDtoSchema } from "@teli/contracts/publications";
import { saveNewPublication } from "../api";
import { Spinner } from "../../components/Spinner";

/**
 * Used when adding a publication directly for an author
 */
export function AddPublicationDialog(props: { author: { id: string; name: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [data, dispatch] = useReducer(publicationFormReducer, {
    author: props.author.name,
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newPublication: { publication: NewPublicationDtoSchema; authorId: string }) => {
      return saveNewPublication(newPublication);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authorDetails"] });
      setIsOpen(false);
      dispatch({ type: "reset" });
      navigate({
        to: `/author/$author`,
        params: { author: props.author.name },
        search: { newAuthorSaved: true },
      });
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
            fontSize: "s4",
            marginTop: "s4",
            padding: "s2",
            paddingLeft: "0",
          })}
        >
          <DocumentPlusIcon className={css({ width: "s3", height: "s3" })} />
          <div>Lisää teos</div>
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
            <div className={css({ padding: "s3", borderRadius: "sm", background: "rose.100", marginBottom: "s2" })}>
              Tallennus epäonnistui.
            </div>
          ) : null}

          <PublicationForm
            disableAuthor={true}
            publication={data}
            dispatch={(field, value) => {
              dispatch({ type: "updatePublicationField", field, value });
            }}
          />

          <button
            className={css(iconBtnPill, {
              fontSize: "s3",
              background: "green.600",
              color: "white",
              marginTop: "s4",
            })}
            onClick={(e) => {
              e.preventDefault();
              setValidationErrors([]);
              const { author, ...publication } = data;
              mutation.mutate({ publication, authorId: props.author.id });
              return;
            }}
          >
            <ArrowUpTrayIcon className={css({ width: "s4", height: "s4" })} />
            Tallenna
          </button>

          {validationErrors.length ? (
            <ul className={css({ padding: "s3", borderRadius: "sm", background: "rose.100" })}>
              {validationErrors?.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          ) : null}
        </Dialog>
      ) : null}
    </>
  );
}
