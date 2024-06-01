'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(`/api/tasks/${id}`, {
        title: title,
        completed: completed,
      });
      setIsLoading(false);
      router.push('/');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      const res = await axios.get(`/api/tasks/${id}`);
      const json = res.data;
      if (!json) {
        router.push('/404');
        return;
      }
      setTitle(json.task.title);
      setCompleted(json.task.completed);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className='form-container'
        onSubmit={handleSubmit}
      >
        <h1 className='text-center text-3xl font-extrabold'>Update Task</h1>
        <input
          type='text'
          placeholder='Input title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=''
        />
        <input
          type='checkbox'
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className=''
        />
        <button
          disabled={isLoading}
          className='btn-submit'
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default Page;
