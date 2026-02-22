import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/todos")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_dashboard/todos"!
      <Outlet />
    </div>
  );
}
