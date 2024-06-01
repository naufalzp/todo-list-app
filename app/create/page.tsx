'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        completed: completed,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    setIsLoading(false);

    router.push('/');
  };

  return (
    <>
      <form
        className='form-container'
        onSubmit={handleSubmit}
      >
        <h1 className='text-center text-3xl font-extrabold'>Create task</h1>
        <input
          type='text'
          placeholder='Input title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full rounded-md border p-2 text-black'
        />
        <div className='flex gap-2'>
          <label htmlFor='completed'>Completed</label>
          <input
            type='checkbox'
            id='completed'
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <button
          disabled={isLoading}
          className='rounded-md bg-emerald-500 px-3 py-2 text-white transition-all hover:bg-white hover:text-black'
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default Page;
