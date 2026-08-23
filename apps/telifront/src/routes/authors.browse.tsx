import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getAuthorIndex } from "../authors/api";
import { css } from "../../styled-system/css";

export const Route = createFileRoute("/authors/browse")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isPending } = useQuery({
    queryKey: ["authorIndex"],
    queryFn: getAuthorIndex,
  });
  return (
    <div>
      <ul
        className={css({
          display: "flex",
          gap: "s4",
        })}
      >
        {data?.letters.map((letter) => (
          <li key={letter}>
            <Link to="/authors/browse/by-letter/$letter" params={{ letter }}>
              {letter}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
