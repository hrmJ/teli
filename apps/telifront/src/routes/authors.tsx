import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getAuthorIndex } from "../authors/api";
import { css } from "../../styled-system/css";
import { iconBtn } from "../styles/button";
import { UserPlusIcon } from "@heroicons/react/24/solid";

export const Route = createFileRoute("/authors")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isPending } = useQuery({
    queryKey: ["authorIndex"],
    queryFn: getAuthorIndex,
  });
  return (
    <div
      className={css({
        padding: "s9",
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
      <ul
        className={css({
          display: "flex",
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
      <Outlet />
    </div>
  );
}
