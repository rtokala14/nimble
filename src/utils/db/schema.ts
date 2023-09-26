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
    default: false,
  },
  dueDate: {
    type: Date,
  },
  uid: {
    type: String,
  },
});

ToDoItemSchema.methods.toggleCompleted = function () {
  this.checked = !this.checked;
};

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
    type: [ToDoItemSchema],
  },
  color: {
    type: String,
  },
});

export type ToDoListType = mongoose.InferSchemaType<typeof ToDoListSchema>;
export const ToDoList =
  mongoose.models.ToDoList || mongoose.model("ToDoList", ToDoListSchema);
export const ToDoItem =
  mongoose.models.ToDoItem || mongoose.model("ToDoItem", ToDoItemSchema);
