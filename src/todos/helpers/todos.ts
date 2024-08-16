import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ complete }),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  const todo = await response.json();
  return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const response = await fetch(`/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  const todo = await response.json();
  return todo;
};

export const deleteTodos = async (): Promise<void> => {
  const response = await fetch(`/api/todos`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete todos");
  }
};
