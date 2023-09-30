import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ToDoItemType } from "@/utils/db/schema";
import AddItemDialog from "./addItemDialog";
import { Separator } from "./ui/separator";
import ListItem from "./listItem";
import { deleteCard } from "@/utils/actions";
import TodoForm from "./TodoForm";

export default function ListCard({
  todoList,
  cardDetails,
}: {
  todoList: ToDoItemType[];
  cardDetails: {
    id: string;
    title: string;
    description: string;
    color: string;
  };
}) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className=" w-full flex items-center justify-between">
          <p>{cardDetails.title}</p>
          <form action={deleteCard}>
            <input
              type="text"
              className=" sr-only"
              name="cardId"
              defaultValue={cardDetails.id}
            />
            <Button variant={"ghost"} size="icon">
              <TrashIcon className=" text-red-400 h-5 w-5" />
            </Button>
          </form>
        </CardTitle>
        <CardDescription>{cardDetails.description}</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        {todoList.map((item, index) => {
          return (
            <ListItem
              key={`${cardDetails.title}-${index}`}
              itemName={item.title}
              itemDescription={item.description ?? ""}
              itemChecked={item.checked}
              //@ts-ignore
              itemId={item._id.toString()}
              cardId={cardDetails.id}
            />
          );
        })}
      </CardContent>
      <CardFooter className="gap-4">
        <TodoForm userId="" cardDetails={cardDetails} />
        <AddItemDialog
          cardTitle={cardDetails.title}
          // prevList={todoList}
          cardId={cardDetails.id}
        />
      </CardFooter>
    </Card>
  );
}
