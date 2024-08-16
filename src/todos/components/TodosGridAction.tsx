"use client";

import { Todo } from "@prisma/client";
import { TodoItemAction } from "./TodoItemAction";
import { updateTodo } from "../actions/todo.actions";

interface Props {
  readonly todos?: Todo[];
}

export function TodosGridAction({ todos = [] }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItemAction key={todo.id} todo={todo} updateTodo={updateTodo} />
      ))}
    </div>
  );
}
