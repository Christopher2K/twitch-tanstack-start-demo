import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { VStack } from "styled-system/jsx";
import { Heading } from "@/components/ui";
import { loginFn$ } from "@/features/auth/auth.functions";
import {
  LoginForm,
  type LoginFormSchema,
} from "@/features/auth/components/login-form";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/todos" });
    }
  },
});

function RouteComponent() {
  const login = useServerFn(loginFn$);

  const { mutate, error } = useMutation({
    mutationFn: login,
  });

  const handleSubmit = (data: LoginFormSchema) => {
    mutate({ data });
  };

  return (
    <VStack maxWidth="500px" margin="auto" gap="10">
      <Heading as="h1" textStyle="lg">
        Todo app with TanStack Start
      </Heading>
      <LoginForm onSubmit={handleSubmit} error={error} />
    </VStack>
  );
}
