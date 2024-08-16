"use server";

import { revalidatePath } from "next/cache";
import { Todo } from "@prisma/client";
import prisma from "@/lib/prisma";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    throw new Error(`Todo with id ${id} not found`);
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-actions");

  return updatedTodo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  try {
    const todo = await prisma.todo.create({
      data: { description },
    });

    revalidatePath("/dashboard/server-actions");

    return todo;
  } catch (error) {
    throw new Error("Error creating todo");
  }
};

export const deleteTodos = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({
      where: { complete: true },
    });

    revalidatePath("/dashboard/server-actions");
  } catch (error) {
    throw new Error("Error deleting completed todos");
  }
};

export const recoveryTodos = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
      data: [
        { description: "Piedra del alma", complete: true },
        { description: "Piedra del tiempo" },
        { description: "Piedra del espacio" },
        { description: "Piedra de la realidad" },
        { description: "Piedra del poder" },
      ],
    });

    revalidatePath("/dashboard/server-actions");
  } catch (error) {
    throw new Error("Error deleting completed todos");
  }
};
