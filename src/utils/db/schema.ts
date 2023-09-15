import * as mongoose from "mongoose";

const ToDoItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  checked: {
    type: Boolean,
  },
  dueDate: {
    type: Date,
  },
});

export type ToDoItemType = mongoose.InferSchemaType<typeof ToDoItemSchema>;

const ToDoListSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  list: {
    type: Array<ToDoItemType>,
  },
  color: {
    type: String,
  },
});

export type ToDoListType = mongoose.InferSchemaType<typeof ToDoListSchema>;
export const ToDoList =
  mongoose.models.ToDo || mongoose.model("ToDo", ToDoListSchema);
