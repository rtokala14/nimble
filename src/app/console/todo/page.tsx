import React from "react";

import { type Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ListCard from "@/components/listCard";
import { getAllTodoLists } from "@/utils/actions";
import TodoForm from "@/components/TodoForm";

export const metadata: Metadata = {
  title: "To-Do | Nimble",
};

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  const list = await getAllTodoLists(user.id ? user.id : "");
  // console.log(list);
  return (
    <div className="w-full h-full p-2 flex flex-col gap-4">
        <div className=" w-full flex items-center justify-between">

        <TodoForm userId={user.id ?? ""} />
        <p className=" text-sm font-light px-2">
            {`${list.length} lists`}
        </p>
        </div>
      <div className=" grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {list.map((item, index) => (
          <ListCard
            key={`List ${index}`}
            todoList={item.list}
            cardDetails={{
              title: item.title,
              description: item.description,
              color: item.color,
              id: item._id.toString(),
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
