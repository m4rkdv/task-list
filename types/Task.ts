export interface Task {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: Date;
  }
  
  export interface RawTask {
    id: number;
    title: string;
    description: string | null;
    completed: 0 | 1; // 0 = false, 1 = true (SQLite)
    createdAt: string;
  }
  
  // Función de conversión
  export function convertToTask(raw: RawTask): Task {
    return {
        id: raw.id,
        title: raw.title,
        description: raw.description,
        completed: raw.completed === 1 ? true : false,
        createdAt: new Date(raw.createdAt), // Convierte string a Date
    };
  }