import { UserPlusIcon } from "@heroicons/react/24/solid";
import { css } from "../../../styled-system/css";
import { iconBtn } from "../../styles/button";
import { Input as InputBase } from "../../components/Input";
import { validateAuthor } from "./validators";
import type { NewPublicationDtoSchema } from "@teli/contracts/publications";
import { use } from "react";
import { AuthorContext } from "../../authors/AuthorContext";

const Input = InputBase<NewPublicationDtoSchema>;

interface Props {
  dispatch: (fieldName: string, value: unknown) => void;
  publication?: Record<string, unknown>;
}

export function PublicationForm({ dispatch, publication }: Props) {
  const data = { ...publication, author: publication?.author ?? "" };

  const inputConsts = { data, dispatch };

  const { authorMap, authors } = use(AuthorContext);
  return (
    <div className={css({ "& > * + *": { marginTop: "s2" }, color: "grey4" })}>
      <Input
        {...inputConsts}
        name="author"
        label="Tekijä"
        list="authors-list"
        required
      />
      <datalist id="authors-list">
        {authors?.map((author) => (
          <option key={author.id} value={author.name}>
            {author.name}
          </option>
        ))}
      </datalist>
      {validateAuthor(authorMap, data?.author) ? (
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className={css(iconBtn, {
            color: "yellow.600",
            fontSize: "s2",
            marginBottom: "s4",
          })}
        >
          <UserPlusIcon className={css({ width: "s3", height: "s3" })} />
          <div>Lisää uusi tekijä</div>
        </button>
      ) : null}
      <Input {...inputConsts} name="title" label="Otsikko (title)" />
      <Input
        {...inputConsts}
        name="englishTitle"
        label="Englanninkielinen otsikko"
      />
      <Input {...inputConsts} name="publisher" label="Kustantaja" />
      <Input {...inputConsts} name="publishLocation" label="Julkaisupaikka" />
      <Input {...inputConsts} name="year" label="Julkaisuvuosi" type="number" />
      <Input {...inputConsts} name="date" label="Julkaisupäivä" type="date" />
      <Input {...inputConsts} name="publicationName" label="Julkaisu" />
      <Input {...inputConsts} name="documentType" label="Documentin tyyppi" />
      <Input {...inputConsts} name="genre" label="Genre" />
      <Input {...inputConsts} name="language" label="Kieli" />
      <Input {...inputConsts} name="link" label="Linkki" />
      <Input {...inputConsts} name="source" label="Lähde" />
      <Input {...inputConsts} name="note" label="Huomioita" />
    </div>
  );
}
