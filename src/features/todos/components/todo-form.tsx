import { Controller, useForm } from "react-hook-form";
import { VStack } from "styled-system/jsx";
import { Alert, Checkbox, Field, Input, Textarea } from "@/components/ui";
import { resolver, type TodoFormType } from "@/features/todos/todos.forms";

export type TodoFormProps = {
  error?: Error | null;
  formId: string;
  onSubmit: (data: TodoFormType) => void;
};
export const TodoForm = ({ formId, onSubmit, error }: TodoFormProps) => {
  const { handleSubmit, register, control } = useForm({
    resolver,
  });

  return (
    <VStack
      gap="10"
      width="100%"
      as="form"
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {error && (
        <Alert.Root status="error">
          <Alert.Title>Error</Alert.Title>
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
          <Field.Label>Title</Field.Label>
          <Input
            type="text"
            placeholder="Something to do..."
            {...register("title")}
          />
        </Field.Root>

        <Field.Root w="full">
          <Field.Label>Description</Field.Label>
          <Textarea
            placeholder="Some details about the task..."
            {...register("description")}
          />
        </Field.Root>

        <Controller
          name="isCompleted"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox.Root
              name="isCompleted"
              checked={value}
              onCheckedChange={({ checked }) => onChange(checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Completed</Checkbox.Label>
            </Checkbox.Root>
          )}
        />
      </VStack>
    </VStack>
  );
};
