import { Link } from "@tanstack/react-router";
import { css } from "../../styled-system/css";

interface Props {
  data?: { name: string; id: string }[];
}

export function AuthorList({ data }: Props) {
  return (
    <div
      className={css({
        display: "flex",
        gap: "s4",
        height: "80vh",
        paddingTop: "s2",
        paddingBottom: "s5",
        overflow: "auto",
        maxWidth: "100%",
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
              display: "inline-block",
              maxWidth: "s12",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            })}
          >
            <Link to="/author/$author" params={{ author: author.name }}>
              {author.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
