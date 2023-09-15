import Drawer from "@/components/drawer";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Nimble",
};

export default async function Home() {
  return <div className=" w-full h-full p-2">Dashboard</div>;
}
