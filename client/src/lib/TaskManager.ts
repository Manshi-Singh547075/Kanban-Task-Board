import { Task, TaskStatus } from "../types";

export class TaskManager {
  private tasks: Task[];
  private setTasks: (tasks: Task[]) => void;

  constructor(tasks: Task[], setTasks: (tasks: Task[]) => void) {
    this.tasks = tasks;
    this.setTasks = setTasks;
  }

  // Add a new task
  addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
    };
    
    this.setTasks([...this.tasks, newTask]);
  };

  // Update an existing task
  updateTask = (updatedTask: Task) => {
    const updatedTasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    
    this.setTasks(updatedTasks);
  };

  // Delete a task by ID
  deleteTask = (id: string) => {
    const filteredTasks = this.tasks.filter((task) => task.id !== id);
    this.setTasks(filteredTasks);
  };

  // Move a task to a different status
  moveTask = (id: string, newStatus: TaskStatus) => {
    const updatedTasks = this.tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    
    this.setTasks(updatedTasks);
  };

  // Clear all completed tasks
  clearCompletedTasks = () => {
    const filteredTasks = this.tasks.filter((task) => task.status !== "completed");
    this.setTasks(filteredTasks);
  };

  // Get tasks by status
  getTasksByStatus = (status: TaskStatus) => {
    return this.tasks.filter((task) => task.status === status);
  };
}
