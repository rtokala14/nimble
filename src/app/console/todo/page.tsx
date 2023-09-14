import React from "react";

import { type Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "To-Do | Nimble",
};

function Page() {
  return (
    <div>
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
