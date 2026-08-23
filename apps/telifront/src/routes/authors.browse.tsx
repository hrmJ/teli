import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getAuthorIndex } from "../authors/api";

export const Route = createFileRoute("/authors/browse")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isPending } = useQuery({
    queryKey: ["authorIndex"],
    queryFn: getAuthorIndex,
  });
  console.log({ error, isPending, data });
  return (
    <div>
      <ul>
        {data?.letters.map((letter) => (
          <li key={letter}>
            <Link to="/authors/browse/view">{letter}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
