import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Box, VStack } from "styled-system/jsx";
import { z } from "zod";
import { Alert, Button, Field, Input } from "@/components/ui";

export const loginFormSchema = z.object({
  email: z.email(),
  password: z.string(),
});
const resolver = zodResolver(loginFormSchema);

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export type LoginFormProps = {
  onSubmit: (data: LoginFormSchema) => unknown;
  error?: Error | null;
  type?: "login" | "signup";
};

export const LoginForm = ({
  onSubmit,
  error,
  type = "login",
}: LoginFormProps) => {
  const { register, handleSubmit } = useForm({
    resolver,
  });

  return (
    <VStack
      gap="10"
      width="100%"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {error && (
        <Alert.Root status="error">
          <Alert.Title>
            {type === "login" ? "Login failed" : "Signup failed"}
          </Alert.Title>
          <Alert.Description>{error.message}</Alert.Description>
        </Alert.Root>
      )}
      <VStack
        width="100%"
        gap="5"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Field.Root w="full">
          <Field.Label>Email</Field.Label>
          <Input type="email" placeholder="Email" {...register("email")} />
        </Field.Root>
        <Field.Root w="full">
          <Field.Label>password</Field.Label>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Field.Root>
      </VStack>

      <Box w="full">
        <Button type="submit">{type === "login" ? "Login" : "Signup"}</Button>
      </Box>
    </VStack>
  );
};
