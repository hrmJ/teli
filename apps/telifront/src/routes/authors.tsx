import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getAuthorIndex } from "../authors/api";
import { css } from "../../styled-system/css";
import { iconBtn } from "../styles/button";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { SearchBar } from "../components/SearchBar";

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
      <button
        onClick={() => null}
        className={css(iconBtn, {
          color: "yellow.600",
          fontSize: "s2",
          marginBottom: "s4",
        })}
      >
        <UserPlusIcon className={css({ width: "s3", height: "s3" })} />
        <div>Lisää tekijä</div>
      </button>
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
            <SearchBar
              searchVal={""}
              setSearchVal={() => null}
              searchFunction={async () => {}}
            />
          </div>
        ) : null}
      </div>

      <Outlet />
    </div>
  );
}
