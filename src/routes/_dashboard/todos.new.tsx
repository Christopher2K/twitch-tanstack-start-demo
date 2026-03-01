import { Portal } from "@ark-ui/react/portal";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { OpenChangeDetails } from "node_modules/@ark-ui/react/dist/components/drawer/drawer";
import { useEffect, useId, useState } from "react";
import { Button, CloseButton, Dialog } from "@/components/ui";
import { TodoForm } from "@/features/todos/components/todo-form";
import type { TodoFormType } from "@/features/todos/todos.forms";
import { createTodoFn$ } from "@/features/todos/todos.functions";

export const Route = createFileRoute("/_dashboard/todos/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const formId = useId();
  const createTodo = useServerFn(createTodoFn$);

  const { mutate, isPending, error } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      navigate({ to: ".." });
    },
  });

  const handleOpenChange = (e: OpenChangeDetails) => {
    if (!e.open) {
      navigate({ to: ".." });
    }
  };

  const handleSubmit = (data: TodoFormType) => {
    mutate({ data });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOpen(true);
    }
  }, []);

  return (
    <Dialog.Root size="lg" onOpenChange={handleOpenChange} open={open}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>New todo</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <TodoForm formId={formId} onSubmit={handleSubmit} error={error} />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button type="submit" form={formId} loading={isPending}>
                Save
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
