"use client";

import { useDrawerStore } from "@/utils/store";
import { HomeIcon } from "@radix-ui/react-icons";

export default function Drawer() {
  const isOpen = useDrawerStore((state) => state.drawerOpen);
  return (
    <div
      className={` ${
        isOpen ? "w-48" : "w-14"
      } pt-4 flex flex-col items-center gap-2 transition-width duration-50`}
    >
      <HomeIcon className="h-6 w-6" />
    </div>
  );
}
