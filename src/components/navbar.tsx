import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import DrawerToggle from "./drawer-toggle";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <nav className=" w-screen fixed top-0 h-12 pr-2 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <DrawerToggle />
        <Button className=" select-none text-lg" variant={"ghost"}>
          <Link href={"/console"}>Nimble</Link>
        </Button>
      </div>
      <div className=" flex items-center gap-2">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user.picture!} />
              <AvatarFallback>{`${user.given_name?.charAt(
                0
              )}${user.family_name?.charAt(0)}`}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuItem>
              <Button variant={"ghost"} className="w-full">
                <Link
                  target="_blank"
                  href={"https://github.com/rtokala14/nimble"}
                >
                  Github
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button asChild variant={"destructive"} className="w-full">
                <LogoutLink>Log Out</LogoutLink>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
