import { useState, useEffect } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { TaskForm } from "./TaskForm";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { PlusIcon, InfoIcon } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// Sample initial tasks with cute girly tasks
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

export function KanbanBoard() {
  // Use local storage to persist tasks
  const [tasks, setTasks] = useLocalStorage("kanbanTasks", initialTasks);
  
  // Set up state variables
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [formStatus, setFormStatus] = useState("todo");

  // Define columns with cute names and colors
  const columns = [
    { id: "todo", title: "To Do ✨", color: "bg-primary" },
    { id: "in-progress", title: "In Progress 💖", color: "bg-warning" },
    { id: "completed", title: "Completed 🌸", color: "bg-success" },
  ];
  
  // Task management functions
  function addTask(task) {
    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
    };
    setTasks([...tasks, newTask]);
  }

  function updateTask(updatedTask) {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  function moveTask(id, newStatus) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  }

  function clearCompletedTasks() {
    const filteredTasks = tasks.filter((task) => task.status !== "completed");
    setTasks(filteredTasks);
  }

  function getTasksByStatus(status) {
    return tasks.filter((task) => task.status === status);
  }

  // Task counts by status
  const todoCount = getTasksByStatus("todo").length;
  const inProgressCount = getTasksByStatus("in-progress").length;
  const completedCount = getTasksByStatus("completed").length;

  // Open task form for new task
  function handleAddTask(status = "todo") {
    setTaskToEdit(null);
    setFormStatus(status);
    setIsTaskFormOpen(true);
  }

  // Open task form for editing
  function handleEditTask(task) {
    setTaskToEdit(task);
    setFormStatus(task.status);
    setIsTaskFormOpen(true);
  }

  // Open delete confirmation
  function handleDeleteClick(id) {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  }

  // Confirm task deletion
  function handleConfirmDelete() {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  }

  // Handle form submission
  function handleTaskFormSubmit(formData) {
    if (taskToEdit) {
      // Update existing task
      updateTask({ ...formData, id: taskToEdit.id });
    } else {
      // Add new task
      addTask(formData);
    }
    setIsTaskFormOpen(false);
  }

  return (
    <main className="container mx-auto px-4 py-20 max-w-7xl">
      <header className="mb-8">
        <div className="relative mb-6">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-3xl relative">
              {/* <img src="attached_assets\Xo~Kitty🩰🎀.jpeg"  className="w-full" /> */}
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-primary drop-shadow-md py-10">
                  ✨ Visual Board ✨
                </h1>
                <p className="text-primary/80 mt-1">Organize your tasks in a cute and fun way!</p>
              </div>
            </div>
          </div>
          <Button 
            className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90"
            onClick={() => handleAddTask()}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Task
          </Button>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-sm mb-6 border border-primary/30">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center text-sm">
              <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
              <span>To Do: <span className="font-medium">{todoCount}</span></span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-3 h-3 rounded-full bg-warning mr-2"></div>
              <span>In Progress: <span className="font-medium">{inProgressCount}</span></span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
              <span>Completed: <span className="font-medium">{completedCount}</span></span>
            </div>
            <div className="flex items-center text-sm ml-auto">
              <InfoIcon className="mr-1 h-4 w-4 text-primary/70" />
              <span className="text-primary/70">Drag tasks between columns to update status</span>
            </div>
          </div>
        </div>
      </header>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            color={column.color}
            tasks={getTasksByStatus(column.id)}
            onAddTask={() => handleAddTask(column.id)}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteClick}
            onClearCompleted={column.id === "completed" ? clearCompletedTasks : undefined}
            moveTask={moveTask}
          />
        ))}
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSubmit={handleTaskFormSubmit}
        task={taskToEdit}
        defaultStatus={formStatus}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
