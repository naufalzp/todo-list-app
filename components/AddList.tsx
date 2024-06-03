"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

type Props = {};

const AddList = (props: Props) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const res = await axios.post("https://todo-list-app-nine-rust.vercel.app/api/tasks", {
        title,
      });

      toast.success("Task added successfully");
      setTitle("");
      router.refresh();
    } catch (error: any) {
      console.log("[TASK_POST]", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add Task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text"
        readOnly={isLoading}
        required
      />

      <button
        disabled={isLoading}
        className="rounded-md bg-emerald-500 px-3 py-2 text-white transition-all hover:bg-white hover:text-black"
      >
        Add
      </button>
    </form>
  );
};

export default AddList;
