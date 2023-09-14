import Drawer from "@/components/drawer";
import { getAllTestItems } from "@/utils/actions";

export default async function Home() {
  const testData = await getAllTestItems();

  return <div>Dashboard</div>;
}
