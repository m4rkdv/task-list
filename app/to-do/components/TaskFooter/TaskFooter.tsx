'use client'

import { Button } from '@/components/ui/button';
import React from 'react';

interface TaskFooterProps {
  taskCount: number;
  onClearAll?: () => void;
}

function TaskFooter({ taskCount, onClearAll }: TaskFooterProps) {
  return (
    <div className='flex justify-between mt-5 items-center'>
      <p className='text-black dark:text-gray-300 text-sm'>
        {taskCount} Tarea{taskCount !== 1 ? 's' : ''}
      </p>
      <Button variant="link" onClick={onClearAll}>
        Borrar todo
      </Button>
    </div>
  );
}

export default TaskFooter;