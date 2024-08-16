import prisma from "@/lib/prisma";
import * as yup from "yup";
import { NextResponse, NextRequest } from "next/server";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const id = params.id;

  const todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const id = params.id;

  try {
    const todoSearch = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todoSearch) {
      return NextResponse.json(
        { message: `Todo with id ${id} not found` },
        { status: 404 }
      );
    }

    const bodyJson = await request.json();
    const body = await putSchema.validate(bodyJson);

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: body,
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
