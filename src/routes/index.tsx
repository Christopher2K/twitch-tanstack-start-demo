import { createFileRoute, Link } from "@tanstack/react-router";
import { VStack } from "styled-system/jsx";
import { Heading } from "@/components/ui";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <VStack
      width="100%"
      justifyContent="flex-start"
      gap="4"
      alignItems="flex-start"
    >
      <Heading as="h1" textStyle="3xl">
        Todo app with TanStack Start
      </Heading>

      <Link to="/login">Login!</Link>
      <Link to="/signup">Signup!</Link>
    </VStack>
  );
}
