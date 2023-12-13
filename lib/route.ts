import { NextResponse, NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { todoTable, db, updateTodo, createTodo } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export const POST = async (request: NextRequest) => {
  const { task } = await request.json();
  const newTodo: createTodo = { task: task };
  try {
    if (task) {
      const res = await db.insert(todoTable).values(newTodo);
      return NextResponse.json({ res });
    } else {
      return NextResponse.json({ message: "Missing required fields" });
    }
  } catch (error) {
    console.log("Error is POST method");
    return NextResponse.json({ message: "SOmething went wrong" });
  }
};

export const GET = async () => {
  try {
    const res = await db.select().from(todoTable);
    return NextResponse.json(res);
  } catch (error) {
    console.log("GET Method Error", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const PUT = async (request: NextRequest) => {
  const { id, task } = await request.json();
  const todoUpdate: updateTodo = { id, task };
  try {
    if (id && task) {
      const res = await db
        .update(todoTable)
        .set(todoUpdate)
        .where(eq(todoTable.id, id));
      return NextResponse.json({
        message: `Todo ${id} is successfully updated`,
      });
    } else {
      return NextResponse.json({ message: "Missing required fields" });
    }
  } catch (error) {
    console.log("Error in Put Method", error);
    return NextResponse.json({ message: "SOmething went wrong" });
  }
};

export const DELETE = async (request: NextRequest) => {
  const { id } = await request.json();
  //   const req = await request.json();
  //   console.log(req);
  try {
    if (id) {
      const res = await db.delete(todoTable).where(eq(todoTable.id, id));
      return NextResponse.json({
        message: `Todo ${id} is successfully deleted`,
      });
    } else {
      return NextResponse.json({ message: "Missing required field Id" });
    }
  } catch (error) {
    console.log("Error in Delete method", error);
    return NextResponse.json({ message: "SOmething went wrong" });
  }
};
