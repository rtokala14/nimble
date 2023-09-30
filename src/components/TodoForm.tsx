"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";
import { addTodoList, editCard } from "@/utils/actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { DialogClose } from "@radix-ui/react-dialog";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  color: z.string().optional(),
});

function TodoForm({
  userId,
  cardDetails,
}: {
  userId: string;
  cardDetails?: {
    id: string;
    title: string;
    description: string;
    color: string;
  };
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: cardDetails ? cardDetails.title : "",
      description: cardDetails ? cardDetails.description : "",
      color: cardDetails ? cardDetails.color : "none",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (cardDetails) {
      const editData = {
        ...values,
        cardId: cardDetails.id,
      };

      const res = editCard({ editDetails: editData });

      toast.promise(res, {
        loading: "Editing List...",
        success: () => {
          return `List edited`;
        },
        error: "Error editing list",
      });
    } else {
      const addData = {
        ...values,
        userId: userId,
      };

      // const res = void addTodoItem(addData);
      const res = addTodoList(addData);

      toast.promise(res, {
        loading: "Adding List...",
        success: () => {
          return `List added`;
        },
        error: "Error",
      });
    }

    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {cardDetails ? (
          <Button className="w-1/2" variant={"secondary"}>
            <Pencil1Icon className="mr-2 h-4 w-4" /> Edit
          </Button>
        ) : (
          <Button className=" w-41">
            <PlusIcon className="mr-2 h-4 w-4" /> Create New
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a To-Do List</DialogTitle>
          <DialogDescription>
            {`Add a new list to organize your todo items into".`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            // onChange={() => console.log(form.getValues())}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Get a haircut" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the title of the To-Do.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="It's high time now" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Scheme</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an optional color scheme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">Default</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose>
                <Button type="button" variant={"destructive"}>
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose>
                <Button type="submit">Add</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TodoForm;
