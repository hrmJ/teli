import { useMemo, useReducer, useState } from "react";
import { authorFormReducer } from "./authorFormReducer";
import { useQuery } from "@tanstack/react-query";
import { getAuthorList } from "../api";
import { css } from "../../../styled-system/css";

interface Props {
  placeholder?: string;
}

export function AddAuthorForm(props: Props) {
  const [state, dispatch] = useReducer(authorFormReducer, {
    firstName: "",
    lastName: "",
  });

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

  const [validationErrors, setValidationErrors] = useState<
    string[] | undefined
  >(undefined);

  return (
    <div
      className={css({
        display: "flex",
        flexDir: "column",
        justifyContent: "space-between",
        color: "grey3",
        fontSize: "s4",
        padding: "s2",
        gap: "s7",
      })}
    >
      <form className={css({})}>
        <h2 className={css({ fontSize: "s8", color: "grey3" })}>Uusi tekijä</h2>

        <div
          className={css({
            display: "flex",
            gap: "s3",
            alignItems: "center",
            marginTop: "s7",
            marginBottom: "s7",
            width: "80%",
          })}
        >
          Moro
        </div>
      </form>

      {validationErrors?.length ? (
        <ul
          className={css({
            padding: "s3",
            borderRadius: "sm",
            background: "rose.100",
          })}
        >
          {validationErrors?.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
