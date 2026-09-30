import { UserPlusIcon } from "@heroicons/react/24/solid";
import { css } from "../../../styled-system/css";
import { iconBtn } from "../../styles/button";
import { PublicationInput } from "./PublicationInput";
import { validateAuthor } from "./validators";

type DispatchFn = (fieldName: string, value: unknown) => void;

interface Props {
  dispatch: DispatchFn;
  publication?: Record<string, unknown>;
  authorMap: Map<string, { name: string; id: string }>;
  authors: { name: string; id: string }[];
}

export function PublicationForm({
  dispatch,
  publication,
  authorMap,
  authors,
}: Props) {
  const inputConsts = { publication, dispatch };

  return (
    <div className={css({ "& > * + *": { marginTop: "s2" }, color: "grey4" })}>
      <PublicationInput
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
      {validateAuthor(authorMap, publication?.author) ? (
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
      <PublicationInput {...inputConsts} name="title" label="Otsikko (title)" />
      <PublicationInput
        {...inputConsts}
        name="englishTitle"
        label="Englanninkielinen otsikko"
      />
      <PublicationInput {...inputConsts} name="publisher" label="Kustantaja" />
      <PublicationInput
        {...inputConsts}
        name="publishLocation"
        label="Julkaisupaikka"
      />
      <PublicationInput
        {...inputConsts}
        name="year"
        label="Julkaisuvuosi"
        type="number"
      />
      <PublicationInput
        {...inputConsts}
        name="date"
        label="Julkaisupäivä"
        type="date"
      />
      <PublicationInput
        {...inputConsts}
        name="publicationName"
        label="Julkaisu"
      />
      <PublicationInput
        {...inputConsts}
        name="documentType"
        label="Documentin tyyppi"
      />
      <PublicationInput {...inputConsts} name="genre" label="Genre" />
      <PublicationInput {...inputConsts} name="language" label="Kieli" />
      <PublicationInput {...inputConsts} name="link" label="Linkki" />
      <PublicationInput {...inputConsts} name="source" label="Lähde" />
      <PublicationInput {...inputConsts} name="note" label="Huomioita" />
    </div>
  );
}
