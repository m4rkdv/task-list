import { NextResponse } from 'next/server';
import getDataBaseClient from '@/data-base/DataBaseClient';
import { RawTask, convertToTask } from '@/types/Task';
import { format } from 'date-fns';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const client = await getDataBaseClient();

    if (id) {
      const result = await client.execute({
        sql: "SELECT * FROM Tasks WHERE id = ?",
        args: [id]
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
    }

    const result = await client.execute("SELECT * FROM Tasks ORDER BY createdAt DESC");
    const tasks = (result.rows as unknown as RawTask[]).map(convertToTask);
    return NextResponse.json(tasks);

  } catch (error) {
    console.error('GET Tasks Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener las tareas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    if (!title) {
      return NextResponse.json(
        { error: 'El título es requerido' },
        { status: 400 }
      );
    }

    const client = await getDataBaseClient();
    const createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const result = await client.execute({
      sql: `INSERT INTO Tasks (title, description, completed, createdAt) 
            VALUES (?, ?, ?, ?) RETURNING *`,
      args: [title, description || '', 0, createdAt],
    });
    
    return NextResponse.json(
      convertToTask(result.rows[0] as unknown as RawTask),
      { status: 201 }
    );
  } catch (error) {
    console.error('POST Task Error:', error);
    return NextResponse.json(
      { error: 'Error al crear la tarea' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const client = await getDataBaseClient();

    
    const result = await client.execute("DELETE FROM Tasks");

    
    if (result.rowsAffected === 0) {
      return NextResponse.json(
        { success: true, message: 'No había tareas para eliminar' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: `Se eliminaron ${result.rowsAffected} tareas correctamente`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE All Tasks Error:', error);
    return NextResponse.json(
      { 
        error: 'Error al eliminar todas las tareas',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}