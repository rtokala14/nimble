"use server";

import { revalidatePath } from "next/cache";
import connectDB from "./db/connect-db";
import { ToDoItemType, ToDoList, ToDoListType } from "./db/schema";

export async function addTodoList(newTodoList: ToDoListType) {
  await connectDB();

  const res = ToDoList.create(newTodoList);

  revalidatePath("/console/todo");
  revalidatePath("/console/reminders");

  return res;
}

export async function getAllTodoLists(userId: string) {
  await connectDB();

  const res = ToDoList.find({ userId: userId });

  return res;
}

export async function addTodoItem({
  listId,
  prevList,
  newData,
}: {
  listId: string;
  prevList: ToDoItemType[];
  newData: ToDoItemType;
}) {
  await connectDB();

  const res = ToDoList.updateOne(
    { _id: listId },
    { list: prevList.concat(newData) }
  );

  revalidatePath("/console/todo");

  return res;
}
