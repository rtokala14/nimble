import * as mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sound: {
      type: String,
      required: true,
    },
  },
  {
    methods: {
      speak() {
        console.log(`${this.sound}!`);
      },
    },
  }
);

export type Test = mongoose.InferSchemaType<typeof testSchema>;
export const Test = mongoose.models.Test || mongoose.model("Test", testSchema);

const ToDoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  color: {
    type: String,
  },
  checked: {
    type: Boolean,
  },
  date: {
    type: Date,
  },
});

export type ToDoType = mongoose.InferSchemaType<typeof ToDoSchema>;
export const ToDo = mongoose.models.ToDo || mongoose.model("ToDo", ToDoSchema);
