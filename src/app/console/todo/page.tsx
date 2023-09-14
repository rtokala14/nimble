import React from "react";

import { type Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ToDoList from "@/components/ToDoList";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const metadata: Metadata = {
  title: "To-Do | Nimble",
};

function Page() {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  return (
    <div>
      <ToDoList userId={user.id ? user.id : ""} />
      <Link href={"/console/todo/create"}>
        <Button>
          <PlusIcon />
          <p>Create</p>
        </Button>
      </Link>
    </div>
  );
}

export default Page;
