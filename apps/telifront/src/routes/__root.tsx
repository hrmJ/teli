import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Navigation } from "../components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { getAuthorList } from "../authors/api";
import { AuthorContext } from "../authors/AuthorContext";
import { css } from "../../styled-system/css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const {
    data: authorData,
    error: getAuthorListError,
    fetchStatus,
  } = useQuery({
    queryKey: ["authorNames"],
    queryFn: async () => {
      return getAuthorList();
    },
  });

  const authors = authorData?.authors ?? [];
  const authorMap = authorData?.authorMap ?? new Map();

  return (
    <React.Fragment>
      <div
        className={css({
          maxWidth: "70vw",
          margin: "auto",
          borderLeft: "1px solid",
          borderRight: "1px solid",
          borderLeftColor: "grey7",
          borderRightColor: "grey7",
          minHeight: "100vh",
        })}
      >
        <Navigation />
        <AuthorContext value={{ authors, authorMap }}>
          <Outlet />
        </AuthorContext>
      </div>
    </React.Fragment>
  );
}
