'use client';
import { Task } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  task: Task;
}

const Todo = ({ task }: Props) => {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    router.refresh();
  };

  return (
    <div className='todo'>
      <h1>{task.title}</h1>
      <div className='mt-4 inline-flex gap-4'>
        <button
          onClick={() => router.push(`/update/${task.id}`)}
          className='btn-update'
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(task.id)}
          className='btn-delete'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
