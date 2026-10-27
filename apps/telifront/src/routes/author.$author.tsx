import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useCanGoBack, useRouter, useSearch } from "@tanstack/react-router";
import { getAuthorDetails } from "../authors/api";
import { Author } from "../authors/Author";
import { css } from "../../styled-system/css";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { iconBtn } from "../styles/button";

export const Route = createFileRoute("/author/$author")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      newAuthorSaved: search.newAuthorSaved ? true : false,
    };
  },
});

function RouteComponent() {
  const { author } = Route.useParams();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { data, error, isPending } = useQuery({
    queryKey: ["authorDetails", author],
    queryFn: async () => getAuthorDetails(author),
  });
  const { newAuthorSaved } = Route.useSearch();

  return (
    <div
      className={css({
        padding: "s10",
        display: "flex",
        flexDirection: "column",
        gap: "s5",
      })}
    >
      {newAuthorSaved ? (
        <div className={css({ padding: "s3", borderRadius: "sm", background: "green.100", marginBottom: "s2" })}>
          Tallennus onnistui.
        </div>
      ) : null}

      <div>
        {canGoBack ? (
          <button className={css(iconBtn, { color: "grey4" })} onClick={() => router.history.back()}>
            <ArrowLeftIcon className={css({ width: "s4", height: "s4" })} />
            Takaisin
          </button>
        ) : null}
      </div>
      <Author author={data} />
    </div>
  );
}
