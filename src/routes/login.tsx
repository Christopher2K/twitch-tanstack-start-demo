import { createFileRoute } from "@tanstack/react-router";
import { VStack } from "styled-system/jsx";
import { Heading } from "@/components/ui";
import {
  LoginForm,
  type LoginFormSchema,
} from "@/features/auth/components/login-form";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSubmit = (data: LoginFormSchema) => {
    console.log(data);
  };

  return (
    <VStack maxWidth="500px" margin="auto" gap="10">
      <Heading as="h1" textStyle="lg">
        Todo app with TanStack Start
      </Heading>
      <LoginForm onSubmit={handleSubmit} error={null} />
    </VStack>
  );
}
