import { useQuery } from "@tanstack/react-query";
import { css } from "../../../styled-system/css";
import { getAuthorList } from "../../authors/api";
import { Spinner } from "../../components/Spinner";
import { useMemo } from "react";
import { PublicationInput } from "./PublicationInput";
import { validateAuthor } from "./validators";

type DispatchFn = (fieldName: string, value: unknown) => void;

interface Props {
  dispatch: DispatchFn;
  publication?: Record<string, unknown>;
}

export function PublicationForm({ dispatch, publication }: Props) {
  const {
    data: authors,
    error,
    fetchStatus,
  } = useQuery({
    queryKey: ["authorNames"],
    queryFn: async () => getAuthorList(),
  });

  const authorMap = useMemo(() => {
    const map = new Map<string, { name: string; id: string }>();
    for (const author of authors ?? []) {
      map.set(author.name, { id: author.id, name: author.name });
    }
    return map;
  }, [authors]);

  if (fetchStatus === "fetching" && !authors) return <Spinner />;

  const inputConsts = { publication, dispatch };

  return (
    <div className={css({ "& > * + *": { marginTop: "s2" }, color: "grey4" })}>
      <PublicationInput
        {...inputConsts}
        name="author"
        label="Tekijä"
        list="authors-list"
        validate={(value) => validateAuthor(authorMap, value)}
        required
      />
      <datalist id="authors-list">
        {authors?.map((author) => (
          <option key={author.id} value={author.name}>
            {author.name}
          </option>
        ))}
      </datalist>
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
