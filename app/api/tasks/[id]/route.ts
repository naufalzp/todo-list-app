import prismadb from "@/lib/prismadb";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      );
    }

    const task = await prismadb.task.findUnique({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(task, { status: 200 });
  } catch (error: any) {
    console.log("[TASK_GET]", error);
    return NextResponse.json({ message: error.meta.cause }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, completed } = body;

    if (!params.id) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      );
    }

    const task = await prismadb.task.update({
      where: { id: Number(params.id) },
      data: { title, completed },
    });

    return NextResponse.json(task, { status: 200 });
  } catch (error: any) {
    console.log("[TASK_PUT]", error);
    return NextResponse.json({ message: error.meta.cause }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      );
    }

    const task = await prismadb.task.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(task, { status: 200 });
  } catch (error: any) {
    console.log("[TASK_DELETE]", error);
    return NextResponse.json({ message: error.meta.cause }, { status: 500 });
  }
}
