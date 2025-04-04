'use client'

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";

interface TaskOptionsProps {
  taskId: number;
  onDelete: (taskId: number) => void;
}

export function TaskOptions({ taskId,onDelete  }: TaskOptionsProps) {
  const handleDelete = () => {
    toast.custom((t) => (
      <div className="flex flex-col gap-2 bg-background p-4 rounded-md shadow-md border border-black w-[300px]">
        <span>¿Seguro que querés eliminar esta tarea?</span>
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
                const response = await fetch(`/api/tasks/${taskId}`, {
                  method: 'DELETE',
                });

                if (response.ok) {
                  onDelete(taskId);
                  toast.success("Tarea eliminada con éxito");
                } else {
                  toast.error("Error al eliminar la tarea");
                }
              } catch (error) {
                toast.error(`Error del servidor: ${error}`);
              } finally {
                toast.dismiss(t);
              }
            }}
          >
            Eliminar
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuGroup>
          {/* Editar */}
          <Link href={`/TaskItem/${taskId}`} passHref>
            <DropdownMenuItem asChild>
              <button className="w-full text-left">
                Editar
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </button>
            </DropdownMenuItem>
          </Link>

          {/* Eliminar */}
          <DropdownMenuItem onClick={handleDelete}>
            Eliminar
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

