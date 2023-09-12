import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import DrawerToggle from "./drawer-toggle";

export default function Navbar() {
  return (
    <nav className=" w-screen fixed top-0 h-12 pr-2 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <DrawerToggle />
        <Button className=" select-none text-lg" variant={"ghost"}>
          Nimble
        </Button>
      </div>
      <div className=" flex items-center gap-2">
        <ModeToggle />
      </div>
    </nav>
  );
}
