import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { css } from "../../styled-system/css";
import { SearchBar } from "../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { filterPublications, getPublications } from "../publications/api";
import { Spinner } from "../components/Spinner";
import { Publication } from "../publications/Publication";
import { labelContainer } from "../styles/label";
import { type ReceptionType } from "@teli/contracts/receptions";
import { Toggle } from "../components/Toggle";

export const Route = createFileRoute("/publications")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchVal, setSearchVal] = useState("");
  const [filterByType, setFilterByType] = useState(false);
  const [receptionTypeFilter, setReceptionTypeFilter] = useState<Record<ReceptionType, boolean>>({
    adaptation: false,
    article: false,
    other: false,
    review: false,
    translation: false,
  });

  function setTypeFilter(fieldName: ReceptionType) {
    return (ev: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      const checked = ev.target.checked;
      setReceptionTypeFilter({ ...receptionTypeFilter, [fieldName]: checked });
    };
  }

  const {
    data: publications,
    error,
    refetch,
    fetchStatus,
    isFetched,
  } = useQuery({
    enabled: false,
    queryKey: ["publications", searchVal],
    queryFn: async () => filterPublications({ query: searchVal, receptionType: filterByType ? receptionTypeFilter : undefined }),
  });

  return (
    <main
      className={css({
        padding: "s9",
        paddingLeft: "s10",
        color: "grey2b",
        width: "100%",
        "& p + p": {
          marginTop: "s4",
        },
      })}
    >
      <section
        className={css({
          marginBottom: "s8",
          background: "yellow.50",
          borderRadius: "sm",
          padding: "s5",
          border: "1px solid",
          borderColor: "grey8",
          color: "grey4",
        })}
      >
        <p className={css({ marginTop: "s4", marginBottom: "s4" })}>
          Etsi tekstejä teoksen, kustantajan tai julkaisun nimen perusteella
        </p>
        <SearchBar
          searchFunction={async () => {
            await refetch();
          }}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />

        <div className={css({ display: "flex", gap: "1rem", alignItems: "center", marginTop: "s5" })}>
          <Toggle onChange={(ev) => setFilterByType(ev.target.checked)} checked={filterByType} />
          <label>Näytä vain tietyt reseptiot</label>
        </div>

        {filterByType ? (
          <div className={css({ marginTop: "s7", display: "flex", flexWrap: "wrap", gap: "s4" })}>
            <div className={css(labelContainer)}>
              <input
                type="checkbox"
                id="translation"
                name="receptionType"
                value="translation"
                checked={receptionTypeFilter.translation}
                onChange={setTypeFilter("translation")}
              />
              <label htmlFor="translation">Käännös</label>
            </div>

            <div className={css(labelContainer)}>
              <input
                type="checkbox"
                id="review"
                name="receptionType"
                value="review"
                checked={receptionTypeFilter.review}
                onChange={setTypeFilter("review")}
              />
              <label htmlFor="review">Arvostelu</label>
            </div>

            <div className={css(labelContainer)}>
              <input
                type="checkbox"
                id="adaptation"
                name="receptionType"
                value="adaptation"
                checked={receptionTypeFilter.adaptation}
                onChange={setTypeFilter("adaptation")}
              />
              <label htmlFor="adaptation">Adaptaatio</label>
            </div>

            <div className={css(labelContainer)}>
              <input
                type="checkbox"
                id="article"
                name="receptionType"
                value="article"
                checked={receptionTypeFilter.article}
                onChange={setTypeFilter("article")}
              />
              <label htmlFor="article">Artikkeli</label>
            </div>

            <div className={css(labelContainer)}>
              <input
                type="checkbox"
                id="other"
                name="receptionType"
                value="other"
                checked={receptionTypeFilter.other}
                onChange={setTypeFilter("other")}
              />
              <label htmlFor="other">Muu</label>
            </div>
          </div>
        ) : null}
      </section>
      <section>
        {fetchStatus === "fetching" ? <Spinner /> : null}
        {!publications?.length && fetchStatus !== "fetching" && isFetched ? (
          <div>Yhtään teosta ei löytynyt. Kokeile toista hakua</div>
        ) : null}

        <div className={css({ marginTop: "s8" })}>
          {publications?.map((publication) => (
            <Publication key={publication.id} publication={publication} displayAs="searchResult" />
          ))}
        </div>
      </section>
    </main>
  );
}
