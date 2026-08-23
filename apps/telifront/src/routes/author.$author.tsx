import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import { getAuthorDetails } from "../authors/api";
import { Author } from "../authors/Author";
import { css } from "../../styled-system/css";
import { linkButtonClass } from "../utils/linkButtonClass";

export const Route = createFileRoute("/author/$author")({
  component: RouteComponent,
});

function RouteComponent() {
  const { author } = Route.useParams();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { data, error, isPending } = useQuery({
    queryKey: ["authorDetails", author],
    queryFn: async () => getAuthorDetails(author),
  });

  return (
    <div
      className={css({
        padding: "s10",
        display: "flex",
        flexDirection: "column",
        gap: "s5",
      })}
    >
      <div>
        {canGoBack ? (
          <button
            className={linkButtonClass}
            onClick={() => router.history.back()}
          >
            Takaisin
          </button>
        ) : null}
      </div>
      <Author author={data} />
    </div>
  );
}
