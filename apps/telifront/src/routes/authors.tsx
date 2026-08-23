import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/authors")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to="/authors/browse">Selaus</Link>
      <Outlet />
    </div>
  );
}
