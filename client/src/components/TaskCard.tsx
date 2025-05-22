import { useDrag } from "react-dnd";
import { Task } from "@/types/index";
import { PencilIcon, TrashIcon, CalendarIcon, CheckCircleIcon } from "lucide-react";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const isCompleted = task.status === "completed";

  // Set up drag source
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Format due date
  const formattedDate = task.dueDate 
    ? format(new Date(task.dueDate), "MMM d")
    : null;

  // Get tag color class based on tag name
  const getTagColorClass = (tag: string) => {
    switch (tag) {
      case "Development":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Design":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Documentation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Bug":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Feature":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div
      ref={drag}
      className={`task-card bg-card p-4 rounded-md shadow-card mb-3 cursor-move hover:shadow-card-hover transition-shadow border border-neutral-200 dark:border-neutral-700 ${
        isDragging ? "opacity-60 shadow-dragging" : ""
      }`}
      style={{ opacity: isDragging ? 0.6 : 1 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-medium ${isCompleted ? "line-through text-neutral-500 dark:text-neutral-400" : "text-neutral-800 dark:text-neutral-200"}`}>
          {task.title}
        </h3>
        <div className="task-actions flex space-x-1">
          <button
            className="edit-task-btn p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit task"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            className="delete-task-btn p-1 text-neutral-400 hover:text-error transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Delete task"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className={`text-sm mb-3 ${isCompleted ? "line-through text-neutral-500 dark:text-neutral-400" : "text-neutral-600 dark:text-neutral-300"}`}>
        {task.description}
      </p>
      <div className="flex items-center justify-between">
        {isCompleted ? (
          <span className="inline-flex items-center text-xs text-neutral-400 dark:text-neutral-500">
            <CheckCircleIcon className="mr-1 h-3 w-3 text-success" />
            Completed
          </span>
        ) : formattedDate ? (
          <span className="inline-flex items-center text-xs text-neutral-500 dark:text-neutral-400">
            <CalendarIcon className="mr-1 h-3 w-3" />
            Due: {formattedDate}
          </span>
        ) : (
          <span></span>
        )}
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTagColorClass(task.tag)}`}>
          {task.tag}
        </span>
      </div>
    </div>
  );
}
