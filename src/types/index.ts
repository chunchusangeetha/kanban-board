// src/types/index.ts
export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO date string (or simple '4/11')
  subtasks?: Subtask[];
}

export interface ColumnType {
  id: string;
  title: string;
  tasks: Task[];
}

export type ColumnsMap = Record<string, ColumnType>;
