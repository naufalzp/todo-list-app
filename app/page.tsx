import Todo from "@/components/Todo";
import Link from "next/link";
import axios from "axios";

const getTasks = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/tasks")
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
        <div className='container'>
            <Link
                href='/create'
                className='btn-create'
            >
                Create
            </Link>
            <div className='mt-8 flex flex-col gap-4'>
                {tasks?.map((task: any, i: number) => (
                    <Todo key={i} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Page;
