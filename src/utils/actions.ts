"use server";

import { revalidatePath } from "next/cache";
import connectDB from "./db/connect-db";
import { ToDoItem, ToDoItemType, ToDoList, ToDoListType } from "./db/schema";
import { randomUUID } from "crypto";

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
  newData,
}: {
  listId: string;
  newData: ToDoItemType;
}) {
  await connectDB();

  const list = await ToDoList.findById(listId);

  if (!list) {
    return { error: true };
  }

  const newItem = new ToDoItem(newData);

  list.list.push(newItem);

  try {
    const res = await list.save();
    revalidatePath("/console/todo");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }

  // return res;
}

export async function toggleOnCheckItem({
  itemId,
  cardId,
}: {
  itemId: string;
  cardId: string;
}) {
  await connectDB();

  const list = await ToDoList.findById(cardId);

  if (!list) {
    return { error: true };
  }

  const item = list.list.id(itemId);

  if (!item) {
    return { error: true, message: "Todo item not found" };
  }

  // item.toggleCompleted();

  // try {
  //   const res = item.save();
  //   revalidatePath("/console/todo");
  //   return { success: true };
  // } catch (error) {
  //   return { success: false, error };
  // }
}
