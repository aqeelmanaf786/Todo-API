// import { pgTable, serial, text } from "drizzle-orm/pg-core";

// import { sql } from "@vercel/postgres";

// import { drizzle } from "drizzle-orm/vercel-postgres";

// import { InferInsertModel, InferSelectModel } from "drizzle-orm";

// // POST,  {task:string}, {id:number, task:sting}

// export const todoTable = pgTable("todo_final", {
//   id: serial("id").primaryKey(),
//   task: text("task").notNull(),
// });

// export type updateTodo = InferSelectModel<typeof todoTable>;

// export type createTodo = InferInsertModel<typeof todoTable>;

// export const db = drizzle(sql);
import { pgTable,serial,text } from "drizzle-orm/pg-core";
import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferInsertModel,InferSelectModel } from "drizzle-orm";

export const todoTable = pgTable("todo_final" , {
  id : serial("id").primaryKey(),
  task : text("task").notNull(),
})

export type updateTodo = InferSelectModel<typeof todoTable>
export type createTodo = InferInsertModel<typeof todoTable>
export const db = drizzle(sql)