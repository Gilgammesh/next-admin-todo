"use client";

import { useOptimistic, startTransition } from "react";
import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  readonly todo: Todo;
  readonly updateTodo: (id: string, complete: boolean) => Promise<Todo>;
}

export function TodoItemAction({ todo, updateTodo }: Props) {
  const [todoOptimistic, updateTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => updateTodoOptimistic(!todoOptimistic.complete));
      await updateTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      startTransition(() => updateTodoOptimistic(!todoOptimistic.complete));
    }
  };
  return (
    <div
      className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100`}
          onClick={onToggleTodo}
        >
          {todo.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  );
}
