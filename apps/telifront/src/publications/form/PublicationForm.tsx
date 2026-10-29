import { UserPlusIcon } from "@heroicons/react/24/solid";
import { css } from "../../../styled-system/css";
import { iconBtn } from "../../styles/button";
import { Input as InputBase } from "../../components/Input";
import { validateAuthor } from "./validators";
import type { NewPublicationDtoSchema } from "@teli/contracts/publications";
import { use, useState } from "react";
import { AuthorContext } from "../../authors/AuthorContext";
import { AddAuthorDialog } from "../../authors/AuthorDialog/AddAuthorDialog";

const Input = InputBase<NewPublicationDtoSchema & { author: string }>;

interface Props {
  dispatch: (fieldName: string, value: unknown) => void;
  publication?: Record<string, unknown>;
  disableAuthor?: boolean;
}

function formatDate(pub: Record<string, unknown> | undefined) {
  if (!pub) return;
  if (pub.date instanceof Date) {
    const year = pub.date.getFullYear();
    const month = String(pub.date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(pub.date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}

export function PublicationForm({ dispatch, publication, disableAuthor }: Props) {
  const data = { ...publication, author: publication?.author ?? "" };

  const inputConsts = { data, dispatch };

  const { authorMap, authors } = use(AuthorContext);
  return (
    <div className={css({ "& > * + *": { marginTop: "s2" }, color: "grey4" })}>
      <Input {...inputConsts} name="author" label="Tekijä" list="authors-list" required disabled={disableAuthor} />
      <datalist id="authors-list">
        {authors?.map((author) => (
          <option key={author.id} value={author.name}>
            {author.name}
          </option>
        ))}
      </datalist>
      {!disableAuthor && validateAuthor(authorMap, data?.author) ? (
        <AddAuthorDialog
          onSuccess={(name) => {
            dispatch("author", name);
          }}
          lastName={typeof data.author === "string" ? data.author : ""}
        />
      ) : null}
      <Input {...inputConsts} name="title" label="Otsikko (title)" />
      <Input {...inputConsts} name="englishTitle" label="Englanninkielinen otsikko" />
      <Input {...inputConsts} name="publisher" label="Kustantaja" />
      <Input {...inputConsts} name="publishLocation" label="Julkaisupaikka" />
      <Input {...inputConsts} name="year" label="Julkaisuvuosi" type="number" />
      <Input {...inputConsts} value={formatDate(publication)} name="date" label="Julkaisupäivä" type="date" />
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
