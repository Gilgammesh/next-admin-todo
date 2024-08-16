"use client";

import { useState } from "react";
import { IoRefreshOutline, IoTrashOutline } from "react-icons/io5";
import {
  createTodo,
  deleteTodos,
  recoveryTodos,
} from "../actions/todo.actions";

export const NewTodoAction = () => {
  const [description, setDescription] = useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (description.trim().length === 0) {
      return;
    }

    await createTodo(description);
    setDescription("");
  };

  const deleteCompleted = async () => {
    await deleteTodos();
  };

  const restoreSeed = async () => {
    await recoveryTodos();
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => restoreSeed()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-green-600 p-2 text-white hover:bg-green-800 transition-all"
      >
        <IoRefreshOutline />
        <span className="ml-2">Recuperar tareas</span>
      </button>

      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-3 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2">Eliminar completados</span>
      </button>
    </form>
  );
};
