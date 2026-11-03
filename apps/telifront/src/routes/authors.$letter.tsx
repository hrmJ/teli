import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getAuthorsByLetter } from "../authors/api";
import { AuthorList } from "../authors/AuthorList";
import { Spinner } from "../components/Spinner";

export const Route = createFileRoute("/authors/$letter")({
  component: RouteComponent,
});

function RouteComponent() {
  const { letter } = Route.useParams();
  const { data, error, isPending } = useQuery({
    queryKey: ["authorsByLetter", letter],
    queryFn: async () => getAuthorsByLetter(letter),
  });
  return isPending ? <Spinner /> : <AuthorList data={data} />;
}
