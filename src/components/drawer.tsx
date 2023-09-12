"use client";

import { HomeIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";

export default function Drawer() {
  const searchParams = useSearchParams();

  const drawWidth = searchParams.get("draw") || "close";
  return (
    <div
      className={` ${
        drawWidth === "close" ? "w-14" : drawWidth === "open" ? "w-40" : "w-14"
      } pt-4 flex flex-col items-center gap-2`}
    >
      <HomeIcon className="h-6 w-6" />
    </div>
  );
}
