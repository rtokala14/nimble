import Drawer from "@/components/drawer";
import { getAllTestItems } from "@/utils/actions";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Nimble",
};

export default async function Home() {
  const testData = await getAllTestItems();

  return <div className=" w-full h-full p-2">Dashboard</div>;
}
