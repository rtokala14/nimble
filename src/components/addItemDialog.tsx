"use client";

import { CalendarIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { addDays, format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { cn } from "@/utils/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ToDoItemType } from "@/utils/db/schema";
import { addTodoItem } from "@/utils/actions";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";

const DialogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
});

export default function AddItemDialog({
  cardTitle,
  cardId,
  prevList,
}: {
  cardTitle: string;
  cardId: string;
  prevList: ToDoItemType[];
}) {
  const form = useForm<z.infer<typeof DialogSchema>>({
    resolver: zodResolver(DialogSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const router = useRouter();

  function onSubmit(data: z.infer<typeof DialogSchema>) {
    const res = addTodoItem({
      listId: cardId,
      prevList: prevList,
      newData: data,
    });

    toast.promise(res, {
      loading: "Adding Item...",
      success: (data) => {
        return `Item added to ${cardTitle}`;
      },
      error: "Error",
    });

    console.log(res);

    // router.push("/console/todo");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2">
          <PlusIcon className="mr-2 h-4 w-4" /> Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item to To-Do List</DialogTitle>
          <DialogDescription>
            {`Add an item to the list \"${cardTitle}\".`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    <>Title of the ToDo item</>
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    <>Optional description</>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className=" flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto flex flex-col space-y-2 p-0"
                      align="start"
                    >
                      <Select
                        onValueChange={(value) =>
                          field.onChange(addDays(new Date(), parseInt(value)))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="0">Today</SelectItem>
                          <SelectItem value="1">Tomorrow</SelectItem>
                          <SelectItem value="3">In 3 days</SelectItem>
                          <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                      </Select>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Optional due date for this item.
                  </FormDescription>
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
