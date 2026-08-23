import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getAuthorDetails, getAuthorsByLetter } from "../authors/api";
import { AuthorDetails } from "../authors/authorDetails";

export const Route = createFileRoute(
  "/authors/browse/by-letter/$letter/$author",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { letter, author } = Route.useParams();
  const { data, error, isPending } = useQuery({
    queryKey: ["authorDetails", letter, author],
    queryFn: async () => getAuthorDetails(author),
  });
  console.log({ letter, author, data });

  return (
    <div>
      details: <AuthorDetails author={data} />
    </div>
  );
}
