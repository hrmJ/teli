import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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
    <ul>
      {data?.map((author) => (
        <li key={author.name}>{author.name}</li>
      ))}
    </ul>
  );
}
