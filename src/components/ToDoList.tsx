import { getAllTodos } from "@/utils/actions";

async function ToDoList({ userId }: { userId: string }) {
  const list = await getAllTodos(userId);
  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
