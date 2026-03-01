import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Box, VStack } from "styled-system/jsx";
import { Button, Text } from "@/components/ui";
import { TodoItem } from "@/features/todos/components/todo-item";
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
    <VStack
      gap="10"
      justifyContent="flex-start"
      alignItems="flex-start"
      py="10"
    >
      <Button asChild>
        <Link to="/todos/new">Add todo</Link>
      </Button>

      <VStack justifyContent="flex-start" alignItems="flex-start">
        {todos.length === 0 && (
          <Box>
            <Text>No todos!</Text>
          </Box>
        )}
        <VStack
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="2"
          width="full"
        >
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </VStack>
      </VStack>

      <Outlet />
    </VStack>
  );
}
