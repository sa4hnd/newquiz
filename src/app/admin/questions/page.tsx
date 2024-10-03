'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AddQuestionPage() {
  const [text, setText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [_subjectId, setSubjectId] = useState('');
  const [_yearId, setYearId] = useState('');
  const [_courseId, setCourseId] = useState('');
  const _router = useRouter();

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-6'>
      <h1 className='text-white text-2xl font-bold mb-4'>Add New Question</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Question text'
          className='w-full bg-white bg-opacity-20 text-white rounded-2xl py-3 px-4'
        />
        {options.map((option, index) => (
          <input
            key={index}
            type='text'
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className='w-full bg-white bg-opacity-20 text-white rounded-2xl py-3 px-4'
          />
        ))}
        <input
          type='text'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder='Correct answer'
          className='w-full bg-white bg-opacity-20 text-white rounded-2xl py-3 px-4'
        />
        <Select onValueChange={(value) => setSubjectId(value)}>
          <SelectTrigger className='w-full bg-white bg-opacity-20 text-white rounded-2xl py-3 px-4'>
            <SelectValue placeholder='Select Subject' />
          </SelectTrigger>
          <SelectContent>
            {/* Fetch and map subjects here */}
            <SelectItem value='1'>Subject 1</SelectItem>
            <SelectItem value='2'>Subject 2</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setYearId(value)}>
          <SelectTrigger className='w-full bg-white bg-opacity-20 text-white rounded-2xl py-3 px-4'>
            <SelectValue placeholder='Select Year' />
          </SelectTrigger>
          <SelectContent>
            {/* Fetch and map years here */}
            <SelectItem value='1'>2023</SelectItem>
            <SelectItem value='2'>2022</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setCourseId(value)}>
          <SelectTrigger className='w-full bg-white bg-opacity-20 text-white rounded-2xl py-3 px-4'>
            <SelectValue placeholder='Select Course' />
          </SelectTrigger>
          <SelectContent>
            {/* Fetch and map courses here */}
            <SelectItem value='1'>Course 1</SelectItem>
            <SelectItem value='2'>Course 2</SelectItem>
          </SelectContent>
        </Select>
        <Button type='submit'>Add Question</Button>
      </form>
    </div>
  );
}
