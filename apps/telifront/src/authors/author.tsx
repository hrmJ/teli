import { type AuthorDto } from "@teliapi/contracts/authors";
import { useState } from "react";
import { Entry } from "../utils/Entry";
import { Publication } from "../publications/Publication";

export function Author(props: { author?: AuthorDto }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  if (!props.author) return;
  const {
    name,
    yearOfBirth,
    yearOfDeath,
    biographicalDetails: bio,
    country,
    language,
    professionalDetails,
    pseudonyms,
    otherNames,
  } = props.author;
  return (
    <article>
      <h3>{name}</h3>
      <button onClick={() => setDetailsOpen(!detailsOpen)}>
        Tekijän tiedot
      </button>
      {detailsOpen ? (
        <ul>
          <Entry value={otherNames} label="Muut nimet" />
          <Entry value={pseudonyms} label="Pseudonyymit" />
          <Entry value={language} label="Kieli" />
          <Entry value={country} label="Maa, jossa aktiivinen" />
          <Entry value={bio} label="Elämäkerrallisia tietoja" />
          <Entry value={professionalDetails} label="Ammatillisia tietoja" />
          <Entry value={yearOfBirth} label="Syntymävuosi" />
          <Entry value={yearOfDeath} label="Kuolinvuosi" />
        </ul>
      ) : null}
      <section>
        <h4>Teokset</h4>
        <div>
          {props.author.publications.map((publication) => (
            <Publication key={publication.id} publication={publication} />
          ))}
        </div>
      </section>
    </article>
  );
}
