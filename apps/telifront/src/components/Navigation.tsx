import { Link } from "@tanstack/react-router";
import { css } from "../../styled-system/css";
import { keycloak } from "../auth/keycloak";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import { iconBtn } from "../styles/button";

const activeProps = {
  style: {
    borderRadius: "4px",
    background: "var(--colors-grey4)",
    color: "white",
  },
};

export function Navigation() {
  return (
    <nav
      className={css({
        display: "flex",
        fontSize: "s4",
        borderBottom: "1px solid grey6",
        justifyContent: "space-between",
        padding: "s3",
        paddingLeft: "s10",
        paddingRight: "s10",
        "& a, & button": {
          color: "grey2b",
        },
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "s3",
          "& a": {
            border: "1px solid",
            borderRadius: "4px",
            padding: "s1",
            borderColor: "grey5",
          },
        })}
      >
        <div>
          <Link activeProps={activeProps} to="/">
            Etusivu
          </Link>
        </div>
        <div>
          <Link activeProps={activeProps} to="/authors">
            Tekijät
          </Link>
        </div>
      </div>
      <div
        className={css({
          fontSize: "s3",
          gap: "s1",
          color: "grey3",
        })}
      >
        {keycloak.authenticated ? (
          <button className={css(iconBtn)} onClick={() => keycloak.logout()}>
            <LockClosedIcon className={css({ width: "s3", height: "s3" })} />
            Kirjaudu ulos
          </button>
        ) : (
          <button className={css(iconBtn)} onClick={() => keycloak.login()}>
            <LockOpenIcon className={css({ width: "s3", height: "s3" })} />
            Kirjaudu sisään
          </button>
        )}
      </div>
    </nav>
  );
}
