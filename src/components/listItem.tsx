import { ToDoItemType } from "@/utils/db/schema";
import { Checkbox } from "./ui/checkbox";
// import { toggleOnCheckItem } from "@/utils/actions";

export default function ListItem({
  item,
  cardId,
}: {
  item: ToDoItemType;
  cardId: string;
}) {
  return (
    <div className="items-top flex space-x-2 mb-2 p-2 hover:outline hover:outline-1 rounded-md">
      <Checkbox
        id={`${item.title}-${item.uid}`}
        checked={item.checked}
        // onCheckedChange={() =>
        //   toggleOnCheckItem({ itemId: item.uid as string, cardId: cardId })
        // }
      />
      <label
        htmlFor={`${item.title}-${item.uid}`}
        className="grid gap-1.5 leading-none w-full"
      >
        <div className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {item.title}
        </div>
        <p className="text-xs text-muted-foreground">{item.description}</p>
      </label>
    </div>
  );
}
