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
  const { title, id } = props.publication;
  const [isOpen, setIsOpen] = useState(false);
  const [receptionsOpen, setReceptionsOpen] = useState(false);
  const {
    data: receptions,
    error,
    isPending: receptionsPending,
  } = useQuery({
    enabled: isOpen,
    queryKey: ["receptions", id],
    queryFn: async () => {
      console.log(
        `Getting receptions for ${props.publication.title} with id ${id}`,
      );
      const result = await getReceptions(id);
      console.log("Got: ", result);
      return result;
    },
  });

  return (
    <article>
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {isOpen ? (
        <div>
          <ul>
            <Entry value={title} label="Title" />
          </ul>
          <section>
            <button onClick={() => setReceptionsOpen(!receptionsOpen)}>
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
