import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getAuthorDetails } from "../authors/api";
import { Author } from "../authors/author";

export const Route = createFileRoute(
  "/authors/browse/by-letter/$letter/$author",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { letter, author } = Route.useParams();
  const { data, error, isPending } = useQuery({
    queryKey: ["authorDetails", author],
    queryFn: async () => getAuthorDetails(author),
  });

  return <Author author={data} />;
}
