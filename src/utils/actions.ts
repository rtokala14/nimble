"use server";

import { revalidatePath } from "next/cache";
import connectDB from "./db/connect-db";
import { Test, ToDo, ToDoType } from "./db/schema";

export async function getAllTestItems() {
  await connectDB();

  const items = Test.find();

  return items;
}

export async function addTestItem(formData: FormData, path: string) {
  await connectDB();

  const res = Test.create({
    name: formData.get("name"),
    sound: formData.get("sound"),
  });

  revalidatePath(path);

  return res;
}

export async function deleteTestItem(delId: string) {
  await connectDB();

  const res = Test.deleteOne({
    _id: delId,
  });

  revalidatePath("/");
  return res;
}

export async function addTodoItem(newTodo: ToDoType) {
  await connectDB();

  const res = ToDo.create(newTodo);

  revalidatePath("/console/todo");
  revalidatePath("/console/reminders");

  return res;
}

export async function getAllTodos(userId: string) {
  await connectDB();

  const res = ToDo.find({
    userId: userId,
  }).exec();

  return res;
}
