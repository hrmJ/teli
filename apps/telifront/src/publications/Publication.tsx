import { useQuery } from "@tanstack/react-query";
import { PublicationDto } from "../../../../packages/contracts/src/publications";
import { PublicationEntry } from "./PublicationEntry";
import { use, useState } from "react";
import { getReceptions } from "./api";
import { Receptions } from "./Receptions";
import { PublicationTitle } from "./PublicationTitle";
import { PublicationLanguage } from "./PublicationLanguage";
import { css } from "../../styled-system/css";
import { PublicationType } from "./PublicationType";
import { PublicationLink } from "./PublicationLink";
import { PublicationAuthor } from "./PublicationAuthor";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import type { DisplayAs } from "../utils/sharedTypes";
import { hasReceptions, numberOfReceptions } from "./receptionHelpers";
import { iconBtn } from "../styles/button";
import { AddReceptionDialog } from "../receptions/ReceptionDialog/AddReceptionDialog";
import { keycloak } from "../auth/keycloak";
import { EditPublicationDialog } from "./PublicationDialog/EditPublicationDialog";
import { AuthorContext } from "../authors/AuthorContext";
import { RemovePublicationDialog } from "./PublicationDialog/RemovePublicationDialog";
import { UnlinkReceptionDialog } from "../receptions/ReceptionDialog/UnlinkReceptionDialog";
import { ReceptionType } from "@teli/contracts/receptions";

interface Props {
  publication: PublicationDto;
  displayAs: DisplayAs;
  parentId?: string;
  parentTitle?: string;
  receptionType?: ReceptionType;
}

export function Publication(props: Props) {
  const {
    title,
    id,
    author,
    date,
    genre,
    language,
    link,
    otherAuthors,
    publicationName,
    source,
    year,
    documentType,
    englishTitle,
    note,
    publisher,
    publishLocation,
    reference,
  } = props.publication;
  const [isOpen, setIsOpen] = useState(false);
  const [receptionsOpen, setReceptionsOpen] = useState(false);
  const {
    data: receptions,
    error,
    isPending: receptionsPending,
  } = useQuery({
    enabled: isOpen,
    queryKey: ["receptions", id],
    queryFn: async () => getReceptions(id),
  });
  const { authorMap, authors } = use(AuthorContext);
  const authorEntry = authorMap.get(author.toLowerCase().trim());
  return (
    <article
      className={css({
        padding: "s5",
        border: props.displayAs === "original" ? "1px solid var(--colors-grey6)" : "1px solid var(--colors-grey7)",
        "&+&": {
          borderTop: props.displayAs === "original" ? "none" : "1px solid var(--colors-grey7)",
          marginTop: props.displayAs === "original" ? "0" : "s4",
        },

        boxShadow: props.displayAs === "original" || props.displayAs === "searchResult" ? "none" : "0 1px 2px hsla(0, 0%, 0%, .2)",
      })}
    >
      <PublicationTitle
        onClick={() => setIsOpen(!isOpen)}
        title={title}
        year={year}
        publisherDetails={{ publisher, publishLocation }}
        displayAs={props.displayAs}
      />
      {isOpen ? (
        <div>
          {keycloak.authenticated ? (
            <div
              className={css({
                display: "flex",
                gap: "s2",
                alignItems: "center",
                color: "yellow.600",
                fontSize: "s2",
                marginTop: "s3",
                marginBottom: "s4",
              })}
            >
              {authorEntry ? (
                <EditPublicationDialog author={authorEntry} publication={props.publication} parentId={props.parentId} />
              ) : null}
              {authorEntry && props.publication ? (
                <RemovePublicationDialog author={authorEntry} publication={props.publication} parentId={props.parentId} />
              ) : null}

              {props.displayAs === "reception" && authorEntry && props.parentId && props.receptionType ? (
                <UnlinkReceptionDialog
                  reception={props.publication}
                  parentId={props.parentId}
                  parentTitle={props.parentTitle}
                  authorName={authorEntry.name}
                  receptionType={props.receptionType}
                />
              ) : null}
            </div>
          ) : null}
          <section
            className={css({
              padding: "s3",
              "& p": {
                color: "grey3",
                fontSize: "s3",
              },
            })}
          >
            <PublicationAuthor author={author} hidden={props.displayAs === "original"} />
            <PublicationLanguage language={language} />
            <PublicationType genre={genre} documentType={documentType} />
            <PublicationLink value={link} />
            <ul className={css({ marginTop: "s4" })}>
              <PublicationEntry value={englishTitle} label="English title" />
              <PublicationEntry value={otherAuthors} label="Other authors" />
              <PublicationEntry value={publicationName} label="Publication name" />
              <PublicationEntry value={date} label="Date" />
              <PublicationEntry value={source} label="Source" />
              <PublicationEntry value={reference} label="Reference" />
              <PublicationEntry value={note} label="Notes" />
            </ul>
          </section>
          {!receptionsPending && hasReceptions(receptions) ? (
            <section className={css({ marginTop: "s5" })}>
              <button
                onClick={() => setReceptionsOpen(!receptionsOpen)}
                data-testid={`receptions__${title}`}
                className={css(iconBtn, {
                  color: props.displayAs === "original" ? "grey3" : "grey4",
                  fontSize: "s5",
                })}
              >
                {receptionsOpen ? (
                  <MinusIcon className={css({ width: "s4", height: "s4" })} />
                ) : (
                  <PlusIcon className={css({ width: "s4", height: "s4" })} />
                )}
                Reseptiot ({numberOfReceptions(receptions)})
              </button>
              <Receptions
                {...receptions}
                hidden={!receptionsOpen}
                parentId={props.publication.id}
                parentTitle={props.publication.title}
              />
            </section>
          ) : null}

          <AddReceptionDialog to={title ?? "?"} originalId={id} />
        </div>
      ) : null}
    </article>
  );
}
