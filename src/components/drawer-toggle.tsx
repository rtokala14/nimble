"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useDrawerStore } from "@/utils/store";

export default function DrawerToggle() {
  const toggleDrawer = useDrawerStore((store) => store.toggleDrawer);
  return (
    <Button onClick={toggleDrawer} variant={"ghost"}>
      <HamburgerMenuIcon className="h-5 w-5" />
    </Button>
  );
}
