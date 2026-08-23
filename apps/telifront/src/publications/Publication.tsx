import { useQuery } from "@tanstack/react-query";
import { PublicationDto } from "../../../../packages/contracts/src/publications";
import { PublicationEntry } from "./PublicationEntry";
import { useState } from "react";
import { getReceptions } from "./api";
import { Receptions } from "./Receptions";
import { PublicationTitle } from "./PublicationTitle";
import { PublicationLanguage } from "./PublicationLanguage";
import { css } from "../../styled-system/css";
import { PublicationType } from "./PublicationType";
import { PublicationLink } from "./PublicationLink";
import { PublicationAuthor } from "./PublicationAuthor";
import { linkButtonClass } from "../utils/linkButtonClass";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { iconButtonClass } from "../utils/iconButtonClass";
import { type DisplayAs } from "../utils/sharedTypes";
import { hasReceptions, numberOfReceptions } from "./receptionHelpers";

interface Props {
  publication: PublicationDto;
  displayAs: DisplayAs;
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

  return (
    <article
      className={css({
        padding: "s5",
        border:
          props.displayAs === "original"
            ? "1px solid var(--colors-grey6)"
            : "1px solid var(--colors-grey7)",
        "&+&": {
          borderTop:
            props.displayAs === "original"
              ? "none"
              : "1px solid var(--colors-grey7)",
          marginTop: props.displayAs === "original" ? "0" : "s4",
        },

        boxShadow:
          props.displayAs === "original"
            ? "none"
            : "0 1px 2px hsla(0, 0%, 0%, .2)",
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
          <section
            className={css({
              padding: "s3",
              "& p": {
                color: "grey3",
                fontSize: "s3",
              },
            })}
          >
            <PublicationAuthor
              author={author}
              hidden={props.displayAs === "original"}
            />
            <PublicationLanguage language={language} />
            <PublicationType genre={genre} documentType={documentType} />
            <PublicationLink value={link} />
            <ul className={css({ marginTop: "s4" })}>
              <PublicationEntry value={englishTitle} label="English title" />
              <PublicationEntry value={otherAuthors} label="Other authors" />
              <PublicationEntry
                value={publicationName}
                label="Publication name"
              />
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
                className={`${linkButtonClass} ${css({
                  color: props.displayAs === "original" ? "grey3" : "grey4",
                  fontSize: "s5",
                })} ${iconButtonClass}`}
              >
                {receptionsOpen ? (
                  <MinusIcon className={css({ width: "s4", height: "s4" })} />
                ) : (
                  <PlusIcon className={css({ width: "s4", height: "s4" })} />
                )}
                Reseptiot ({numberOfReceptions(receptions)})
              </button>
              <Receptions {...receptions} hidden={!receptionsOpen} />
            </section>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
