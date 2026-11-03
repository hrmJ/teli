import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getAuthorIndex, searchAuthors } from "../authors/api";
import { css } from "../../styled-system/css";
import { SearchBar } from "../components/SearchBar";
import { AddAuthorDialog } from "../authors/AuthorDialog/AddAuthorDialog";
import { useState } from "react";
import { Spinner } from "../components/Spinner";
import { AuthorList } from "../authors/AuthorList";

export const Route = createFileRoute("/authors")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchVal, setSearchVal] = useState("");

  const { data, error, isPending } = useQuery({
    queryKey: ["authorIndex"],
    queryFn: getAuthorIndex,
  });

  const {
    data: searchData,
    error: searchError,
    isPending: searchPending,
    fetchStatus: searchStatus,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ["authorSearch", searchVal],
    queryFn: async () => searchAuthors(searchVal),
    enabled: false,
  });

  return (
    <div
      className={css({
        paddingLeft: "s10",
        marginTop: "s4",
      })}
    >
      <AddAuthorDialog />
      <div className={css({ maxWidth: "s22" })}>
        <ul
          className={css({
            display: "flex",
            flexWrap: "wrap",
            gap: "s4",
            "& a": {
              fontWeight: "s2",
              color: "grey2",
            },
          })}
        >
          {data?.letters.map((letter) => (
            <li key={letter}>
              <Link to="/authors/$letter" params={{ letter }}>
                {letter}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <section
        className={css({
          marginTop: "s4",
          marginBottom: "s3",
          background: "yellow.50",
          borderRadius: "sm",
          padding: "s5",
          border: "1px solid",
          borderColor: "grey8",
          color: "grey4",
        })}
      >
        <p className={css({ marginTop: "s4", marginBottom: "s1" })}>Etsi tekijöistä</p>
        <SearchBar
          searchFunction={async () => {
            if (searchVal.length < 2) return;
            await refetchSearch();
          }}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
      </section>

      {searchStatus === "fetching" ? <Spinner /> : null}

      {!searchVal ? <Outlet /> : <AuthorList data={searchData} />}
    </div>
  );
}
