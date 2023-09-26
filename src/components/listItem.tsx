"use client";

import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
import { toggleOnCheckItem } from "@/utils/actions";

export default function ListItem({
  itemName,
  itemDescription,
  itemChecked,
  itemId,
  cardId,
}: {
  itemName: string;
  itemDescription: string;
  itemChecked: boolean;
  itemId: string;
  cardId: string;
}) {
  return (
    <div className="items-top flex space-x-2 mb-2 p-2 hover:outline hover:outline-1 rounded-md">
      <Checkbox
        id={`${itemName}-${itemId}`}
        checked={itemChecked}
        onCheckedChange={() => {
          const res = toggleOnCheckItem({
            itemId: itemId as string,
            cardId: cardId,
          });

          toast.promise(res, {
            loading: "Updating item...",
            success: () => {
              return "Toggled item successfully";
            },
            error: "Error",
          });
        }}
      />
      <label
        htmlFor={`${itemName}-${itemId}`}
        className="grid gap-1.5 leading-none w-full"
      >
        <div className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {itemName}
        </div>
        <p className="text-xs text-muted-foreground">{itemDescription}</p>
      </label>
    </div>
  );
}
