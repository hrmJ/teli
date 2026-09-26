import { Link } from "@tanstack/react-router";
import { css } from "../../styled-system/css";

export function Navigation() {
  return (
    <nav
      className={css({
        display: "flex",
        background: "grey6",
        justifyContent: "space-between",
        padding: "s3",
        paddingLeft: "s10",
        "& a, & button": {
          color: "grey2b",
        },
      })}
    >
      <div>
        <Link to="/authors">Tekijät</Link>
      </div>
      <div>
        <button>Kirjaudu sisään</button>
      </div>
    </nav>
  );
}
