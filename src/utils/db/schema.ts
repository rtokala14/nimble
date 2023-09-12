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
export const Test = mongoose.model("Test", testSchema);
