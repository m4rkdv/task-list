'use client'

import { useEffect, useState } from 'react';
import { Task } from '@/types/Task';
import SingleTask from './SingleTask';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

interface TaskAreaProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onTaskChange: () => void;
}

export default function TaskArea({ tasks, setTasks, onTaskChange }: TaskAreaProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    onTaskChange();
  };

  const handleTaskDelete = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    onTaskChange();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div className="p-4 text-center">Cargando tareas...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-4 flex flex-col h-full">
      <AllTaskHeader />
      <ScrollArea >
        <div className="flex flex-col gap-3 p-1 min-w-[300px]">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task.id} className="relative">
                <SingleTask 
                  task={task} 
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay tareas disponibles
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function AllTaskHeader() {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Lista de tareas</h2>
      <Link href="/TaskForm">
        <Button>Agregar Tarea</Button>
      </Link>
    </div>
  );
}