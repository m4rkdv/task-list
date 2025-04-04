'use client'

import TaskFooter from "../to-do/components/TaskFooter/TaskFooter";
import Filter from "../to-do/components/Filter/Filter";
import TaskHeader from "../to-do/components/TaskHeader/TaskHeader";
import PageContainer from "@/components/PageContainer";
import TaskArea from "../to-do/components/TaskArea/TaskArea";
import { useState, useCallback } from 'react';
import { Task } from '@/types/Task';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshCount, setRefreshCount] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshCount(prev => prev + 1);
  }, []);

  const handleClearAll = async () => {
    toast.custom((t) => (
      <div className="flex flex-col gap-2 bg-background p-4 rounded-md shadow-md border border-black w-[300px]">
        <span>¿Seguro que querés eliminar TODAS las tareas?</span>
        <span className="text-xs text-muted-foreground">
          Esta acción no se puede deshacer
        </span>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => toast.dismiss(t)}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              try {
                const response = await fetch('/api/tasks', {
                  method: 'DELETE',
                });
  
                if (response.ok) {
                  setTasks([]);
                  triggerRefresh();
                  toast.success("Todas las tareas fueron eliminadas");
                } else {
                  const errorData = await response.json();
                  toast.error(`Error: ${errorData.error || 'Error al eliminar'}`);
                }
              } catch (error) {
                toast.error(`Error del servidor: ${error instanceof Error ? error.message : 'Error desconocido'}`);
              } finally {
                toast.dismiss(t);
              }
            }}
          >
            Eliminar Todo
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <PageContainer> 
      <TaskHeader/>
      <Filter tasks={tasks} refreshCount={refreshCount}/>
      <TaskArea 
        tasks={tasks} 
        setTasks={setTasks}
        onTaskChange={triggerRefresh}
      />
      <TaskFooter 
        taskCount={tasks.length} 
        onClearAll={handleClearAll}
      />
    </PageContainer>
  );
}