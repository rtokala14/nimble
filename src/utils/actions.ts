"use server";

import connectDB from "./db/connect-db";
import { Test } from "./db/schema";

export async function getAllTestItems() {
  await connectDB();

  const items = Test.find();

  return items;
}
