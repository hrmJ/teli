import { type AuthorDto } from "@teliapi/contracts/authors";
import { useState } from "react";

export function AuthorDetails(props: { author?: AuthorDto }) {
  const [isOpen, setIsOpen] = useState(false);
  if (!props.author) return;
  const { name, yearOfBirth } = props.author;
  return (
    <article>
      <h3>{name}</h3>
      <button onClick={() => setIsOpen(!isOpen)}> Tekijän tiedot </button>
      {isOpen ? (
        <div>
          <ul>{yearOfBirth ? <li>Syntymävuosi: {yearOfBirth}</li> : null}</ul>
        </div>
      ) : null}
    </article>
  );
}
