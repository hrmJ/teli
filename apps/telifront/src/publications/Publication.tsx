import { useQuery } from "@tanstack/react-query";
import { PublicationDto } from "../../../../packages/contracts/src/publications";
import { Entry } from "../utils/Entry";
import { useState } from "react";
import { getReceptions } from "./api";
import { Receptions } from "./Receptions";

interface Props {
  publication: PublicationDto;
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
    <article>
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {isOpen ? (
        <div>
          <ul>
            <Entry value={title} label="Title" />
            <Entry value={author} label="Author" />
            <Entry value={documentType} label="Document type" />
            <Entry value={englishTitle} label="English title" />
            <Entry value={otherAuthors} label="Other authors" />
            <Entry value={publicationName} label="Publication name" />
            <Entry value={year} label="Year" />
            <Entry value={date} label="Date" />
            <Entry value={genre} label="Genre" />
            <Entry value={language} label="Language" />
            <Entry value={link} label="Link" />
            <Entry value={source} label="Source" />
            <Entry value={publisher} label="Publisher" />
            <Entry value={publishLocation} label="Publish location" />
            <Entry value={reference} label="Reference" />
            <Entry value={note} label="Notes" />
          </ul>
          <section>
            <button
              onClick={() => setReceptionsOpen(!receptionsOpen)}
              data-testid={`receptions__${title}`}
            >
              Reseptiot
            </button>
            {!receptionsPending ? (
              <Receptions {...receptions} hidden={!receptionsOpen} />
            ) : null}
          </section>
        </div>
      ) : null}
    </article>
  );
}
