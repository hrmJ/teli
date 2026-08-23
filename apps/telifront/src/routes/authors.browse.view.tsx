import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getAuthorDetails } from "../authors/api";

export const Route = createFileRoute("/authors/browse/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isPending } = useQuery({
    queryKey: ["authorIndex"],
    queryFn: getAuthorDetails,
  });

  return <div>{data?.name}</div>;
}
