import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Sample initial tasks with cute girly aesthetic tasks
const initialTasks = [
  {
    id: 'task-1',
    title: 'Decorate planner',
    description: 'Add stickers and washi tape to my cute weekly planner',
    status: 'todo',
    dueDate: '2023-08-25',
    tag: 'Design'
  },
  {
    id: 'task-2',
    title: 'Create birthday cards',
    description: 'Make handmade birthday cards for my friends',
    status: 'todo',
    dueDate: '2023-08-28',
    tag: 'Documentation'
  },
  {
    id: 'task-3',
    title: 'Organize makeup collection',
    description: 'Sort makeup by type and put in cute organizers',
    status: 'todo',
    dueDate: '2023-08-30',
    tag: 'Development'
  },
  {
    id: 'task-4',
    title: 'Plan fairy garden',
    description: 'Research miniature plants and fairy decorations for garden',
    status: 'in-progress',
    dueDate: '2023-08-27',
    tag: 'Development'
  },
  {
    id: 'task-5',
    title: 'Paint bedroom wall',
    description: 'Paint accent wall in soft pastel color with cloud pattern',
    status: 'in-progress',
    dueDate: '2023-08-26',
    tag: 'Design'
  },
  {
    id: 'task-6',
    title: 'Create vision board',
    description: 'Collect inspirational images and quotes for vision board',
    status: 'completed',
    dueDate: '2023-08-20',
    tag: 'Development'
  }
];

// Create Task Context
const TaskContext = createContext(null);

// Task Provider component
export function TaskProvider({ children }) {
  // Use local storage to persist tasks
  const [tasks, setTasks] = useLocalStorage("kanbanTasks", initialTasks);

  // Add a new task
  function addTask(task) {
    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
    };
    
    setTasks([...tasks, newTask]);
  }

  // Update an existing task
  function updateTask(updatedTask) {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    
    setTasks(updatedTasks);
  }

  // Delete a task by ID
  function deleteTask(id) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  // Move a task to a different status
  function moveTask(id, newStatus) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    
    setTasks(updatedTasks);
  }

  // Clear all completed tasks
  function clearCompletedTasks() {
    const filteredTasks = tasks.filter((task) => task.status !== "completed");
    setTasks(filteredTasks);
  }

  // Get tasks by status
  function getTasksByStatus(status) {
    return tasks.filter((task) => task.status === status);
  }

  // Create context value object
  const contextValue = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    clearCompletedTasks,
    getTasksByStatus,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook to use the task context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
