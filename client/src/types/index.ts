export type TaskStatus = "todo" | "in-progress" | "completed";

export type TaskTag = "Development" | "Design" | "Documentation" | "Bug" | "Feature";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  tag: TaskTag;
}

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
}

export interface DragItem {
  id: string;
  type: string;
  status: TaskStatus;
}
