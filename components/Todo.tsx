"use client";
import { Task } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdTrash } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  task: Task;
}

const Todo = ({ task }: Props) => {
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");
      router.refresh();
    } catch (error) {
      console.log('[TASK_DELETE]', error);
      toast.error("Failed to delete task");
    }
  };

  const handleCheck = async (id: number) => {
    try {
      await axios.put(`/api/tasks/${id}`, {
        title: title,
        completed: !completed,
      });
      setCompleted(!completed);
      toast.success("Task updated");
      router.refresh();
    } catch (error) {
      console.log('[TASK_PUT]', error);
      toast.error("Failed to update task");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submit");

    try {
      await axios.put(`/api/tasks/${task.id}`, {
        title: title,
        completed: false,
      });
      setCompleted(false);
      setIsSubmitted(true);
      toast.success("Task updated");
      window.setTimeout(() => {
        setIsSubmitted(false);
      }, 1000);
      router.refresh();
    } catch (error) {
      console.log('[TASK_PUT]', error);
      setIsSubmitted(false);
      toast.error("Failed to update task");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(false);
    setTitle(e.target.value);
    setIsSubmitted(false);
  };

  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleCheck(task.id)}
      />
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          disabled={isSubmitted}
          className={completed ? "strikethrough" : ""}
        />
      </form>
      <div className="todo-action">
        <button onClick={() => handleDelete(task.id)} className="btn-delete">
          <IoMdTrash />
        </button>
      </div>
    </div>
  );
};

export default Todo;
