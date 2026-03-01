import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getTodosByUserIdFn$ } from "@/features/todos/todos.functions";

export const Route = createFileRoute("/_dashboard/todos")({
  component: RouteComponent,
  loader: async ({ context }) => {
    if (!context.user) throw new Error("Unauthenticated");
    const todos = await getTodosByUserIdFn$({
      data: { userId: context.user.userId },
    });
    return { todos };
  },
});

function RouteComponent() {
  const { todos } = Route.useLoaderData();
  console.log("RouteComponent", todos);

  return (
    <div>
      Hello "/_dashboard/todos"!
      <Outlet />
    </div>
  );
}
