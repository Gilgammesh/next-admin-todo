export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodoAction, TodosGridAction } from "@/todos";

export const metadata = {
  title: "Listado de todos",
  description: "SEO Tittle",
};

export default async function ServerActionsPage() {
  const todos = await prisma.todo.findMany({
    orderBy: { description: "asc" },
  });

  return (
    <div>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5 mt-5">
        <NewTodoAction />
      </div>
      <TodosGridAction todos={todos} />
    </div>
  );
}
