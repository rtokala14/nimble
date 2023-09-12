import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { addTestItem, deleteTestItem, getAllTestItems } from "@/utils/actions";
import { TrashIcon } from "@radix-ui/react-icons";

export default async function Home() {
  const testData = await getAllTestItems();
  return (
    <main>
      <ModeToggle />
      <ul>
        {testData.map((item, index) => (
          <li key={index}>
            <div>{item.name}</div>
            <form
              action={async () => {
                "use server";

                await deleteTestItem(item.id);
              }}
            >
              <Button variant={"destructive"}>
                <TrashIcon />
              </Button>
            </form>
          </li>
        ))}
      </ul>
      <form
        action={async (formData) => {
          "use server";
          await addTestItem(formData, "/");
        }}
      >
        <label htmlFor="name">Name</label>
        <Input name="name" />
        <label htmlFor="sound">Sound</label>
        <Input name="sound" />
        <Button type="submit">Add Item</Button>
      </form>
    </main>
  );
}
