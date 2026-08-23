import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getAuthorDetails, getAuthorsByLetter } from "../authors/api";
import { css } from "../../styled-system/css";

export const Route = createFileRoute("/authors/$letter")({
  component: RouteComponent,
});

function RouteComponent() {
  const { letter } = Route.useParams();
  const { data, error, isPending } = useQuery({
    queryKey: ["authorsByLetter", letter],
    queryFn: async () => getAuthorsByLetter(letter),
  });
  return (
    <div
      className={css({
        display: "flex",
        gap: "s4",
        height: "80vh",
        paddingTop: "s5",
        paddingBottom: "s5",
      })}
    >
      <ul
        className={css({
          display: "flex",
          flexFlow: "column wrap",
          gap: "s2",
          color: "grey3",
        })}
      >
        {data?.map((author) => (
          <li
            key={author.name}
            className={css({
              // flex: "1 1 100px",
              display: "inline-block",
              maxWidth: "s12",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              // border: "1px solid black",
            })}
          >
            <Link to="/author/$author" params={{ author: author.name }}>
              {author.name}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
