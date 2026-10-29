import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Navigation } from "../components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { getAuthorList } from "../authors/api";
import { AuthorContext } from "../authors/AuthorContext";

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
      <Navigation />
      <AuthorContext value={{ authors, authorMap }}>
        <Outlet />
      </AuthorContext>
    </React.Fragment>
  );
}
