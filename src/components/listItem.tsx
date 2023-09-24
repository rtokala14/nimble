import { ToDoItemType } from "@/utils/db/schema";
import { Checkbox } from "./ui/checkbox";

export default function ListItem({ item }: { item: ToDoItemType }) {
  return (
    <div className="items-top flex space-x-2 mb-2 p-2 hover:outline hover:outline-1 rounded-md">
      <Checkbox id={`${item.title}`} checked={item.checked} />
      <label
        htmlFor={`${item.title}`}
        className="grid gap-1.5 leading-none w-full"
      >
        <div className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {item.title}
        </div>
        <p className="text-xs text-muted-foreground">{item.description}</p>
        <p>{item.dueDate?.toDateString()}</p>
      </label>
    </div>
  );
}
