import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getAuthorIndex } from "../authors/api";
import { css } from "../../styled-system/css";

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
        padding: "s10",
      })}
    >
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
