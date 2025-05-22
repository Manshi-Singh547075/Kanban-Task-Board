import { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { KanbanColumn } from "./KanbanColumn";
import { TaskForm } from "./TaskForm";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { PlusIcon, InfoIcon } from "lucide-react";

export function KanbanBoard() {
  // Get task functions from context
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    clearCompletedTasks,
    getTasksByStatus,
  } = useTaskContext();

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
    <main className="container mx-auto px-4 py-6 max-w-7xl">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-primary">
              ✨ My Cute Task Board ✨
            </h1>
            <p className="text-muted-foreground mt-1">Organize your tasks in a cute and fun way!</p>
          </div>
          <Button 
            className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90"
            onClick={() => handleAddTask()}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Task
          </Button>
        </div>
        
        <div className="bg-card p-4 rounded-lg shadow-sm mb-6 border border-primary/20">
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
