import { ActionDispatch, useEffect, useState } from "react";
import { css } from "../../../styled-system/css";
import { labelContainer } from "../../styles/label";
import { useQuery } from "@tanstack/react-query";
import { getPublications } from "../../publications/api";
import { Spinner } from "../../components/Spinner";
import { SearchBar } from "../../components/SearchBar";
import { PublicationForm } from "../../publications/form/PublicationForm";
import { ReceptionFormAction } from "./receptionFormReducer";

interface Props {
  existingOrNew: "existing" | "new";
  existingPublication?: { title: string; id: string };
  dispatch: ActionDispatch<[action: ReceptionFormAction]>;
  newPublication?: Record<string, unknown>;
  authors: { id: string; name: string }[];
  authorMap: Map<string, { id: string; name: string }>;
}

export function SelectPublication({
  existingOrNew,
  existingPublication,
  newPublication,
  dispatch,
  authorMap,
  authors,
}: Props) {
  const [searchVal, setSearchVal] = useState(existingPublication?.title ?? "");

  const {
    data: publications,
    error,
    refetch,
    fetchStatus,
    isFetched,
  } = useQuery({
    enabled: false,
    queryKey: ["publications", searchVal],
    queryFn: async () => getPublications(searchVal),
  });

  useEffect(() => {
    if (existingPublication?.title && !publications && searchVal.length > 2) {
      console.log("UE refe", { publications, isFetched });
      refetch();
    }
  }, [publications]);

  return (
    <div>
      <fieldset
        className={css({
          display: "flex",
          gap: "s7",
          marginBottom: "s5",
        })}
      >
        <div className={css(labelContainer)}>
          <input
            type="radio"
            id="oldPub"
            name="selectedPub"
            value="old"
            onChange={() =>
              dispatch({
                type: "useNewOrExistingPublication",
                newOrExisting: "existing",
              })
            }
            checked={existingOrNew === "existing"}
          />
          <label htmlFor="oldPub">Tietokannasta</label>
        </div>

        <div className={css(labelContainer)}>
          <input
            type="radio"
            id="newPub"
            name="selectedPub"
            value="new"
            onChange={() => {
              dispatch({
                type: "useNewOrExistingPublication",
                newOrExisting: "new",
              });
            }}
            checked={existingOrNew === "new"}
          />
          <label htmlFor="newPub">Uusi</label>
        </div>
      </fieldset>
      {existingOrNew === "existing" ? (
        <div>
          <SearchBar
            searchFunction={async () => {
              dispatch({ type: "clearExistingPublication" });
              await refetch();
            }}
            searchVal={searchVal}
            setSearchVal={setSearchVal}
          />
          <Spinner enabled={fetchStatus === "fetching"} />
          <ul
            className={css({
              "& > li + li": { marginTop: "s3" },
              marginTop: "s3",
              paddingTop: "s4",
              color: "grey4",
              fontSize: "s3",
              maxHeight: "s16",
              overflow: "auto",
            })}
          >
            {publications?.map((publication) => (
              <li key={publication.id} className={css(labelContainer)}>
                <input
                  type="radio"
                  id={publication.id}
                  name="selectedExistingPub"
                  value={publication.id}
                  checked={existingPublication?.id === publication.id}
                  onChange={() =>
                    dispatch({
                      type: "existingPublicationAsReception",
                      id: publication.id,
                      title: publication.title ?? "?",
                    })
                  }
                />
                <label htmlFor={publication.id}>
                  {publication.title} ({publication.author} {publication.year})
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className={css({
            maxHeight: "s16",
            overflow: "auto",
            paddingRight: "s4",
            paddingLeft: "s1",
          })}
        >
          <PublicationForm
            dispatch={(field, value) =>
              dispatch({ type: "updateNewPublicationField", field, value })
            }
            publication={newPublication}
            authorMap={authorMap}
            authors={authors}
          />
        </div>
      )}
    </div>
  );
}
