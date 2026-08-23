import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getAuthorDetails, getAuthorsByLetter } from "../authors/api";

export const Route = createFileRoute("/authors/browse/by-letter/$letter")({
  component: RouteComponent,
});

function RouteComponent() {
  const { letter } = Route.useParams();
  const { data, error, isPending } = useQuery({
    queryKey: ["authorsByLetter", letter],
    queryFn: async () => getAuthorsByLetter(letter),
  });
  return (
    <div>
      <ul>
        {data?.map((author) => (
          <li key={author.name}>
            <Link
              to="/authors/browse/by-letter/$letter/$author"
              params={{ letter, author: author.name }}
            >
              {author.name}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
