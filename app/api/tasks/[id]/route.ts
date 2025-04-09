import { NextResponse } from 'next/server';
import getDataBaseClient from '@/data-base/DataBaseClient';
import { convertToTask, RawTask } from '@/types/Task';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(request: Request, context: Context) {
  try {
    const client = await getDataBaseClient();
    const { id } = context.params;

    const result = await client.execute({
      sql: "SELECT * FROM Tasks WHERE id = ?",
      args: [id],
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Tarea no encontrada' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(
      convertToTask(result.rows[0] as unknown as RawTask)
    );
  } catch (error) {
    console.error('GET Task by ID Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener la tarea' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: Context) {
  try {
    const { id } = context.params;
    const { title, description, completed } = await request.json();
    const client = await getDataBaseClient();

    const result = await client.execute({
      sql: `UPDATE Tasks 
            SET title = ?, description = ?, completed = ? 
            WHERE id = ? 
            RETURNING *`,
      args: [title, description, completed ? 1 : 0, id],
    });

    return NextResponse.json(
      convertToTask(result.rows[0] as unknown as RawTask)
    );
  } catch (error) {
    console.error('PUT Task Error:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la tarea' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: Context) {
  try {
    const { id } = context.params;
    const client = await getDataBaseClient();

    await client.execute({
      sql: "DELETE FROM Tasks WHERE id = ?",
      args: [id],
    });

    return NextResponse.json(
      { success: true, message: 'Tarea eliminada correctamente' }
    );
  } catch (error) {
    console.error('DELETE Task Error:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la tarea' },
      { status: 500 }
    );
  }
}
