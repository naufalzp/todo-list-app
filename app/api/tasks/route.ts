import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const tasks = await prismadb.task.findMany();
        return NextResponse.json(tasks, { status: 200 });
    } catch (error: any) {
        console.log("[TASK_GET]", error);
        return NextResponse.json({ message: error.meta.cause }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title } = body;

        if (!title) {
            return NextResponse.json({ message: "Task title is required" }, { status: 400 });
        }

        const task = await prismadb.task.create({
            data: { title },
        });

        return NextResponse.json(task, { status: 201 });
    } catch (error: any) {
        console.log("[TASK_POST]", error);
        return NextResponse.json({ message: error.meta.cause }, { status: 500 });
    }
}
