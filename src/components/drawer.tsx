"use client";

import { useDrawerStore } from "@/utils/store";
import {
  ClockIcon,
  Crosshair2Icon,
  GearIcon,
  HomeIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";

export default function Drawer() {
  const isOpen = useDrawerStore((state) => state.drawerOpen);
  return (
    <div
      className={` ${
        isOpen ? "w-48" : "w-0 hidden md:flex md:w-14"
      } pt-4 flex flex-col items-start justify-between transition-width`}
    >
      <div className="flex flex-col items-start gap-4">
        <Link href={"/console"} className="w-full">
          <Button
            variant={"ghost"}
            className="flex items-center justify-start w-full gap-2"
          >
            <HomeIcon
              className={`${"h-6 w-6"} "transition-width transition-height duration-75 ease-out"`}
            />
            <h3 className={`${isOpen ? "flex" : "hidden"} transition-all`}>
              Dashboard
            </h3>
          </Button>
        </Link>

        <Link href={"/console/reminders"} className="w-full">
          <Button
            variant={"ghost"}
            className="flex items-center justify-start w-full gap-2"
          >
            <ClockIcon
              className={`${"h-6 w-6"} "transition-width transition-height duration-75"`}
            />
            <h3 className={`${isOpen ? "flex" : "hidden"} transition-all`}>
              Reminders
            </h3>
          </Button>
        </Link>

        <Link href={"/console/focus"} className="w-full">
          <Button
            variant={"ghost"}
            className="flex items-center justify-start w-full gap-2"
          >
            <Crosshair2Icon
              className={`${"h-6 w-6"} "transition-width transition-height duration-75"`}
            />
            <h3 className={`${isOpen ? "flex" : "hidden"} transition-all`}>
              Focus
            </h3>
          </Button>
        </Link>

        <Separator orientation="horizontal" />

        <Link href={"/console/todo"} className="w-full">
          <Button
            variant={"ghost"}
            className="flex items-center justify-start w-full gap-2"
          >
            <Pencil2Icon
              className={`${"h-6 w-6"} "transition-width transition-height duration-75"`}
            />
            <h3 className={`${isOpen ? "flex" : "hidden"} transition-all`}>
              To-Do
            </h3>
          </Button>
        </Link>
      </div>

      <Link href={"/console/settings"} className="w-full justify-self-end mb-4">
        <Button
          variant={"ghost"}
          className="flex items-center justify-start w-full gap-2"
        >
          <GearIcon
            className={`${"h-6 w-6"} "transition-width transition-height duration-75"`}
          />
          <h3 className={`${isOpen ? "flex" : "hidden"} transition-all`}>
            Settings
          </h3>
        </Button>
      </Link>
    </div>
  );
}
