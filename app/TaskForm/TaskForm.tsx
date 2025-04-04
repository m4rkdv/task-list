'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { useEffect } from 'react'
import { Task } from '@/types/Task'
import { formatDate } from '@/lib/utils';

// Esquema de validación con Zod
const taskFormSchema = z.object({
  title: z.string()
    .min(2, { message: 'El título debe tener al menos 2 caracteres' })
    .max(50, { message: 'El título no puede exceder los 50 caracteres' }),
  description: z.string()
    .max(500, { message: 'La descripción no puede exceder los 500 caracteres' })
    .optional(),
  completed: z.boolean().default(false),
  createdAt: z.string().optional(),
})

type TaskFormValues = z.infer<typeof taskFormSchema>

interface TaskItemProps {
  task?:Task
  isNew?: boolean
}

export default function TaskForm({ task, isNew = false }: TaskItemProps) {
  const router = useRouter()

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      completed: task?.completed || false,
      createdAt: task?.createdAt ? new Date(task.createdAt).toISOString() : '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title || '',
        description: task.description || '',
        completed: task.completed || false,
        createdAt: task.createdAt
        ? new Date(task.createdAt).toISOString()
        : '',
      })
    }
  }, [task, form])

  async function onSubmit(data: TaskFormValues) {
    try {
      if (isNew) {
        // Crear nueva tarea
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        
        if (!response.ok) throw new Error('Error al crear la tarea')
        toast.success('Tarea creada correctamente')
      } else {
        // Actualizar tarea existente
        if (!task?.id) throw new Error('ID de tarea no proporcionado')
        
        const response = await fetch(`/api/tasks/${task.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) throw new Error('Error al actualizar la tarea')
        toast.success('Cambios guardados correctamente')
      }

      router.push('/TaskList') 
      router.refresh()
    } catch (error) {
      toast.error(`Ocurrió un error al guardar los cambios${error}`)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Toaster position="top-right" richColors />
      <h1 className="text-2xl font-bold">
        {isNew ? 'Crear Nueva Tarea' : 'Editar Tarea'}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem >
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input className='border border-black' placeholder="Título de la tarea" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isNew && (
            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de creación</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-black"
                      value={field.value ? formatDate(field.value) : ''}
                      disabled
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descripción detallada de la tarea"
                    className="resize-none border border-black"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Opcional. Máximo 500 caracteres.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="completed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-black p-4">
                <FormControl>
                  <Checkbox
                    className='border border-black'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>¿Completada?</FormLabel>
                  <FormDescription>
                    Marca esta casilla si la tarea está finalizada
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit">
              {isNew ? 'Crear Tarea' : 'Guardar Cambios'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}