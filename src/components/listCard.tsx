import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { ToDoItemType } from "@/utils/db/schema";
import AddItemDialog from "./addItemDialog";
import { Separator } from "./ui/separator";

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
    <Card>
      <CardHeader>
        <CardTitle>{cardDetails.title}</CardTitle>
        <CardDescription>{cardDetails.description}</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        {todoList.map((item, index) => (
          <p key={`${cardDetails.title}-${index}`}>{item.title}</p>
        ))}
      </CardContent>
      <CardFooter className="gap-4">
        <AddItemDialog
          cardTitle={cardDetails.title}
          prevList={todoList}
          cardId={cardDetails.id}
        />
        <Button className="w-1/2">
          <Pencil1Icon className="mr-2 h-4 w-4" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
