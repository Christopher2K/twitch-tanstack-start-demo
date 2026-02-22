import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { VStack } from "styled-system/jsx";
import { Heading } from "@/components/ui";
import {
  LoginForm,
  type LoginFormSchema,
} from "@/features/auth/components/login-form";
import { signupFn$ } from "@/features/auth.functions";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/todos" });
    }
  },
});

function RouteComponent() {
  const signup = useServerFn(signupFn$);
  const { mutate, error } = useMutation({
    mutationFn: signup,
  });

  const handleSubmit = (data: LoginFormSchema) => {
    mutate({ data });
  };

  return (
    <VStack maxWidth="500px" margin="auto" gap="10">
      <Heading as="h1" textStyle="lg">
        Create an account
      </Heading>
      <LoginForm onSubmit={handleSubmit} error={error} type="signup" />
    </VStack>
  );
}
