import { use, useReducer, useState } from "react";
import { css } from "../../../styled-system/css";
import { iconBtn, iconBtnPill } from "../../styles/button";
import { Dialog } from "../../components/Dialog";
import { ArrowUpTrayIcon, PencilIcon } from "@heroicons/react/24/solid";
import { PublicationForm } from "../form/PublicationForm";
import { publicationFormReducer } from "./publicationFormReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublicationDto, type NewPublicationDtoSchema } from "@teli/contracts/publications";
import { updatePublication } from "../api";
import { Spinner } from "../../components/Spinner";
import { AuthorContext } from "../../authors/AuthorContext";

/**
 * Used when adding a publication directly for an author
 */
export function EditPublicationDialog(props: { author: { id: string; name: string }; publication: PublicationDto; parentId?: string }) {
  const { authorMap } = use(AuthorContext);
  const [isOpen, setIsOpen] = useState(false);
  const [newAuthorId, setNewAuthorId] = useState<string | undefined>(undefined);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [data, dispatch] = useReducer(publicationFormReducer, {
    ...props.publication,
    author: props.author.name,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { publication: NewPublicationDtoSchema; publicationId: string }) => {
      return updatePublication({ ...data, newAuthorId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authorDetails", props.author.name] });
      if (props.parentId) {
        queryClient.invalidateQueries({ queryKey: ["receptions", props.parentId] });
      }
      setIsOpen(false);
    },
  });

  if (mutation.isPending) {
    return <Spinner />;
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={css(iconBtn)}>
        <PencilIcon className={css({ width: "s2", height: "s2" })} />
        Muokkaa teosta
      </button>
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
            disableAuthor={false}
            publication={data}
            dispatch={(field, value) => {
              if (field === "author" && typeof value === "string") {
                const authorEntry = authorMap.get(value.toLowerCase().trim());
                setNewAuthorId(authorEntry?.id);
              }
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
              mutation.mutate({ publication, publicationId: props.publication.id });
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
