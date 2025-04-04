import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/types/Task';
import { TaskOptions } from './TaskOptions';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import Link from 'next/link'; 

interface SingleTaskProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: number) => void;
}

export default function SingleTask({ task, onUpdate, onDelete }: SingleTaskProps) {
  const handleToggleComplete = async (checked: boolean) => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, completed: checked }),
      });

      if (!response.ok) throw new Error('Error al actualizar');
      const updatedTask = await response.json();
      onUpdate(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className={cn(
      'border rounded-md p-3 flex items-stretch justify-between',
      'border-black dark:border-input',
      task.completed && 'opacity-70 bg-muted',
      'min-h-[96px] h-auto'
    )}>
      
      <Link 
        href={`/TaskItem/${task.id}`} 
        className="flex-1 max-w-[calc(100%-100px)]"
        passHref
      >
        <ScrollArea className="pr-3 h-full">
          <div className="space-y-1">
            <Label 
              htmlFor={`task-${task.id}`}
              className={cn(
                'font-medium block text-lg break-words hover:text-primary transition-colors cursor-pointer',
                task.completed && 'line-through in-dark:text-gray-500'
              )}
            >
              {task.title}
            </Label>
            
            {task.description && (
              <p className="text-xs in-dark:text-muted-foreground whitespace-pre-line break-all overflow-wrap-anywhere">
                {task.description}
              </p>
            )}
          </div>
        </ScrollArea>
      </Link>

      
      <div className="w-[100px] flex-shrink-0 flex items-center justify-end gap-2 pl-2">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={handleToggleComplete}
          className="h-5 w-5"
        />
        <TaskOptions 
          taskId={task.id}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}