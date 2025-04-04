'use client'

import { useState, useEffect } from 'react';
import { Task } from '@/types/Task';

type SingleFilter = { 
    label: string; 
    counter: number;
    type: 'completed' | 'pending';
  };
  
  interface FilterProps {
    tasks?: Task[];
    refreshCount?: number;
  }
  
  export default function Filter({ tasks = [], refreshCount = 0 }: FilterProps) {
    const [filters, setFilters] = useState<SingleFilter[]>([
      { label: "Completados", counter: 0, type: 'completed' },
      { label: "Pendientes", counter: 0, type: 'pending' },
    ]);
  
    useEffect(() => {
      if (tasks.length > 0) {
        setFilters([
          { 
            label: "Completados", 
            counter: tasks.filter(task => task.completed).length,
            type: 'completed'
          },
          { 
            label: "Pendientes", 
            counter: tasks.filter(task => !task.completed).length,
            type: 'pending'
          }
        ]);
      } else {
        setFilters([
          { label: "Completados", counter: 0, type: 'completed' },
          { label: "Pendientes", counter: 0, type: 'pending' }
        ]);
      }
    }, [tasks, refreshCount]);
  
    return (
      <div className='flex gap-5 py-5'>
        {filters.map((filter, index) => (
          <SingleFilterCard 
            key={index} 
            filter={filter} 
            className="w-full"
          />
        ))}
      </div>
    );
  }
  
  
  function SingleFilterCard({
    filter,
    className
  }: { 
    filter: SingleFilter;
    className?: string;
  }) {
    return (
      <div className={className}>
        <div className='flex flex-col gap-2 items-center p-4 border border-black in-dark:border-inherit rounded-lg'>
          <div className='flex justify-between items-center w-full'>
            <p className='text-xl font-medium dark:text-gray-300'>{filter.label}</p>
          </div>
          <div className='flex gap-1 items-baseline'>
            <p className='text-3xl font-bold mt-1'>{filter.counter}</p>
            <p className='text-gray-800 dark:text-gray-300'>Tareas</p>
          </div>
        </div>
      </div>
    );
  }