'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import TaskForm from '@/app/TaskForm/TaskForm'
import { convertToTask, Task } from '@/types/Task'
import PageContainer from '@/components/PageContainer'

export default function EditTaskPage() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState<Task | null>(null) 

useEffect(() => {
  async function fetchTask() {
    try {
      const response = await fetch(`/api/tasks/${id}`)
      if (!response.ok) throw new Error('Error al obtener la tarea')
      const rawData = await response.json()
      const converted = convertToTask(rawData)
      setTask(converted)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  fetchTask()
}, [id])

  if (loading) return <p className="p-6">Cargando tarea...</p>
  if (!task) return <p className="p-6">No se encontró la tarea</p>

  return (
    <PageContainer>
      <TaskForm task={task} />
    </PageContainer>
  )
}
