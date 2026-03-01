import { css } from "styled-system/css";
import { Checkbox, Text } from "@/components/ui";
import type { TodoRecord } from "@/services/db/schema";

export type TodoItemProps = {
  todo: TodoRecord;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const isCompleted = todo.completedAt !== null;
  return (
    <Checkbox.Root checked={isCompleted} name={todo.id}>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label
        className={css({
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        })}
      >
        <Text
          as="span"
          textDecoration={isCompleted ? "line-through" : undefined}
        >
          {todo.title}
        </Text>
        {todo.description && (
          <Text
            as="span"
            color="gray.500"
            textDecoration={isCompleted ? "line-through" : undefined}
          >
            {todo.description}
          </Text>
        )}
      </Checkbox.Label>
    </Checkbox.Root>
  );
};
