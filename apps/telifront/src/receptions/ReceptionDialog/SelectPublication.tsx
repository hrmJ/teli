import { useState } from "react";
import { css } from "../../../styled-system/css";
import { labelContainer } from "../../styles/label";
import { useQuery } from "@tanstack/react-query";
import { getPublications } from "../../publications/api";
import { Spinner } from "../../components/Spinner";
import { SearchBar } from "../../components/SearchBar";
import { NewPublication } from "../../publications/NewPublication";

interface Props {
  placeholder?: string;
}

export function SelectPublication(props: Props) {
  const [pubType, setPubType] = useState("old");
  const [searchVal, setSearchVal] = useState("");

  const {
    data: publications,
    error,
    refetch,
    fetchStatus,
  } = useQuery({
    enabled: false,
    queryKey: ["publications", searchVal],
    queryFn: async () => getPublications(searchVal),
  });

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
            onChange={() => setPubType("old")}
            checked={pubType === "old"}
          />
          <label htmlFor="oldPub">Tietokannasta</label>
        </div>

        <div className={css(labelContainer)}>
          <input
            type="radio"
            id="newPub"
            name="selectedPub"
            value="new"
            onChange={() => setPubType("new")}
            checked={pubType === "new"}
          />
          <label htmlFor="newPub">Uusi</label>
        </div>
      </fieldset>
      {pubType === "old" ? (
        <div>
          <SearchBar
            searchFunction={async () => {
              await refetch();
            }}
            searchVal={searchVal}
            setSearchVal={setSearchVal}
          />
          <Spinner enabled={fetchStatus === "fetching"} />
          <ul>
            {publications?.map((publication) => (
              <li key={publication.id} className={css(labelContainer)}>
                <input
                  type="radio"
                  id={publication.id}
                  name="selectedExistingPub"
                  value="new"
                />
                <label htmlFor={publication.id}>
                  {publication.title} ({publication.author} {publication.year})
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <NewPublication />
      )}
    </div>
  );
}
