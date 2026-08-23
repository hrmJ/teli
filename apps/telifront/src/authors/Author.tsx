import { type AuthorDto } from "@teliapi/contracts/authors";
import { AuthorEntry } from "./AuthorEntry";
import { Publication } from "../publications/Publication";
import { css } from "../../styled-system/css";

export function Author(props: { author?: AuthorDto }) {
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
      <h3
        className={css({
          fontFamily: "var(--font-heading-1)",
          letterSpacing: "-0.02em",
          fontSize: "s11",
          color: "grey2",
          marginBottom: "s5",
        })}
      >
        {name}
      </h3>
      <ul className={css({ padding: "s4" })}>
        <AuthorEntry value={otherNames} label="Muut nimet" />
        <AuthorEntry value={pseudonyms} label="Pseudonyymit" />
        <AuthorEntry value={language} label="Kieli" />
        <AuthorEntry value={country} label="Maa, jossa aktiivinen" />
        <AuthorEntry value={bio} label="Elämäkerrallisia tietoja" />
        <AuthorEntry value={professionalDetails} label="Ammatillisia tietoja" />
        <AuthorEntry value={yearOfBirth} label="Syntymävuosi" />
        <AuthorEntry value={yearOfDeath} label="Kuolinvuosi" />
      </ul>
      <section>
        <div className={css({ marginTop: "s8" })}>
          {props.author.publications.map((publication) => (
            <Publication
              key={publication.id}
              publication={publication}
              displayAs="original"
            />
          ))}
        </div>
      </section>
    </article>
  );
}
