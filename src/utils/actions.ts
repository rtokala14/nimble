"use server";

import { revalidatePath } from "next/cache";
import connectDB from "./db/connect-db";
import { ToDoItem, ToDoItemType, ToDoList, ToDoListType } from "./db/schema";

export async function addTodoList(newTodoList: {
  userId: string;
  title: string;
  description?: string | undefined;
  color?: string | undefined;
}) {
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

  item.toggleCompleted();

  try {
    const res = list.save();
    revalidatePath("/console/todo");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteCard(formData: FormData) {
  await connectDB();
  const res = await ToDoList.findByIdAndDelete(formData.get("cardId"));
  revalidatePath("/console/todo");

  return { success: true };
}

export async function editCard({
  editDetails,
}: {
  editDetails: {
    cardId: string;
    title: string;
    description?: string | undefined;
    color?: string | undefined;
  };
}) {
  await connectDB();

  try {
    const res = await ToDoList.findByIdAndUpdate(editDetails.cardId, {
      title: editDetails.title,
      description: editDetails.description,
      color: editDetails.color,
    });

    revalidatePath("/console/todo");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
