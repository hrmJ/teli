import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getAuthorIndex } from "../authors/api";
import { css } from "../../styled-system/css";
import { SearchBar } from "../components/SearchBar";
import { AddAuthorDialog } from "../authors/AuthorDialog/AddAuthorDialog";

export const Route = createFileRoute("/authors")({
  component: RouteComponent,
});

const enableSearch = false;

function RouteComponent() {
  const { data, error, isPending } = useQuery({
    queryKey: ["authorIndex"],
    queryFn: getAuthorIndex,
  });

  return (
    <div
      className={css({
        padding: "s9",
        paddingLeft: "s10",
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

        {enableSearch ? (
          <div
            className={css({
              width: "s14",
              paddingTop: "s2",
              paddingBottom: "s2",
              marginTop: "s5",
              marginBottom: "s2",
            })}
          >
            <SearchBar searchVal={""} setSearchVal={() => null} searchFunction={async () => {}} />
          </div>
        ) : null}
      </div>

      <Outlet />
    </div>
  );
}
