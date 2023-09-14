import Drawer from "@/components/drawer";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      <div className="flex w-full h-screen pt-12 justify-stretch">
        <Drawer />
        <div className="h-full w-full p-2">
          <div className="h-full w-full rounded-md bg-secondary text-secondary-foreground">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
