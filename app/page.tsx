import Todo from "@/components/Todo";
import axios from "axios";
import AddList from "@/components/AddList";
import { toast } from "react-hot-toast";

const getTasks = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/tasks");
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.log("[TASK_GET]", error);
    return null;
  }
};

export const revalidate = 0;

const Page = async () => {
  const tasks = await getTasks();

  return (
    <div className="container">
      <div className="title">
        <h1>To Do List</h1>
      </div>

      <AddList />

      <div className="list">
        {tasks?.map((task: any, i: number) => (
          <Todo key={i} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Page;
