import TodoForm from "@/components/TodoForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create To-Do | Nimble",
};

function Page() {
  const { getUser } = getKindeServerSession();

  const user = getUser();
  return (
    <div className="w-full my-auto flex flex-col items-center p-10 bg-background border-secondary border-2  rounded-md">
      <h2 className="text-2xl font-semibold">Create To-Do</h2>
      <TodoForm userId={user.id ? user.id : ""} />
    </div>
  );
}

export default Page;
