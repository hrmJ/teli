import { useQuery } from "@tanstack/react-query";
import { css } from "../../styled-system/css";
import { getAuthorList } from "../authors/api";
import { Spinner } from "../components/Spinner";
import { useMemo } from "react";
import { baseInpt } from "../styles/input";

interface Props {
  placeholder?: string;
}

export function NewPublication(props: Props) {
  const {
    data: authors,
    error,
    fetchStatus,
  } = useQuery({
    queryKey: ["authorNames"],
    queryFn: async () => getAuthorList(),
  });

  const authorMap = useMemo(
    () =>
      authors?.reduce((output, author) => ({
        ...output,
        [author.name]: author,
      })),
    [authors],
  );

  if (fetchStatus === "fetching") return <Spinner />;

  return (
    <div className={css({ "& > * + *": { marginTop: "s2" }, color: "grey4" })}>
      <div>
        <label>Tekijä</label>
        <input
          className={css({
            width: "100%",
            background: "white",
            padding: "s1",
            border: "1px solid",
            borderColor: "grey7",
          })}
          list="authors-list"
          placeholder="Etsi nimellä.."
        />
        <datalist id="authors-list">
          {authors?.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </datalist>
      </div>
      <div>
        <label>Otsikko</label>
        <input type="text" className={css(baseInpt)} />
      </div>
      <div>
        <label>Englanninkielinen otsikko</label>
        <input type="text" className={css(baseInpt)} />
      </div>
      <div>
        <label>Kustantaja</label>
        <input type="text" className={css(baseInpt)} />
      </div>
      <div>
        <label>Julkaisupaikka</label>
        <input type="text" className={css(baseInpt)} />
      </div>
      <div>
        <label>Julkaisuvuosi</label>
        <input type="number" className={css(baseInpt)} />
      </div>
      <div>
        <label>Julkaisupäivä</label>
        <input type="date" className={css(baseInpt)} />
      </div>
      <div>
        <label>Julkaisu</label>
        <input type="text" className={css(baseInpt)} />
      </div>
      <div>
        <label>Dokumentin tyyppi</label>
        <input type="text" className={css(baseInpt)} />
      </div>
      <div>
        <label>Genre</label>
        <input type="text" className={css(baseInpt)} />
      </div>
      <div>
        <label>Kieli</label>
        <input type="text" className={css(baseInpt)} />
      </div>
      <div>
        <label>Linkki</label>
        <input type="text" className={css(baseInpt)} />
      </div>
      <div>
        <label>Lähde</label>
        <input type="text" className={css(baseInpt)} />
      </div>
      <div>
        <label>Humioita</label>
        <input type="text" className={css(baseInpt)} />
      </div>
    </div>
  );
}
