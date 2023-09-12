"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function DrawerToggle() {
  const searchParams = useSearchParams();

  const drawWidth = searchParams.get("draw") || "close";
  return (
    <Button asChild variant={"ghost"}>
      <Link
        href={`?${new URLSearchParams({
          draw:
            drawWidth === "open"
              ? "close"
              : drawWidth === "close"
              ? "open"
              : "open",
        })}`}
        prefetch
      >
        <HamburgerMenuIcon className="h-5 w-5" />
      </Link>
    </Button>
  );
}
