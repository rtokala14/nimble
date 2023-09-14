import Drawer from "@/components/drawer";
import { getAllTestItems } from "@/utils/actions";

export default async function Home() {
  const testData = await getAllTestItems();

  return (
    <main className="flex w-full h-screen pt-12 justify-stretch">
      <Drawer />
      <div className="h-full w-full p-2">
        <div className="h-full w-full rounded-md bg-secondary text-secondary-foreground"></div>
      </div>
    </main>
  );
}
