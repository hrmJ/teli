import { UserIcon } from "@heroicons/react/24/solid";
import { css } from "../../styled-system/css";
import { Link } from "@tanstack/react-router";

interface Props {
  author?: string;
  hidden: boolean;
}

export function PublicationAuthor({ author, hidden }: Props) {
  if (!author || hidden) return null;
  return (
    <div
      className={css({
        display: "flex",
        gap: "s1",
        alignItems: "center",
      })}
    >
      <UserIcon className={css({ width: "s3", height: "s3" })} />
      <p>
        <Link to={"/author/$author"} params={{ author }}>
          {author}
        </Link>
      </p>
    </div>
  );
}
