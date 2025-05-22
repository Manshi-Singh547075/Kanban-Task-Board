import { useDrag } from "react-dnd";
import { PencilIcon, TrashIcon, CalendarIcon, CheckCircleIcon, Sparkles } from "lucide-react";
import { format } from "date-fns";

export function TaskCard({ task, onEdit, onDelete }) {
  const isCompleted = task.status === "completed";

  // Set up drag source for drag and drop
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

  // Get tag color class based on tag name - using cute colors
  function getTagColorClass(tag) {
    switch (tag) {
      case "Development":
        return "bg-green-100 text-green-800";
      case "Design":
        return "bg-blue-100 text-blue-800";
      case "Documentation":
        return "bg-purple-100 text-purple-800";
      case "Bug":
        return "bg-red-100 text-red-800";
      case "Feature":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  // Get cute emoji based on tag
  function getTagEmoji(tag) {
    switch (tag) {
      case "Development": return "👩‍💻";
      case "Design": return "🎨";
      case "Documentation": return "📝";
      case "Bug": return "🐞";
      case "Feature": return "✨";
      default: return "💖";
    }
  }

  return (
    <div
      ref={drag}
      className={`task-card bg-card p-4 rounded-md mb-3 cursor-move transition-all border border-primary/20 ${
        isDragging ? "opacity-60" : ""
      }`}
      style={{ opacity: isDragging ? 0.6 : 1 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-medium ${isCompleted ? "line-through text-primary/50" : "text-primary"}`}>
          {task.title}
        </h3>
        <div className="task-actions flex space-x-1">
          <button
            className="edit-task-btn p-1 text-primary/60 hover:text-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit task"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            className="delete-task-btn p-1 text-primary/60 hover:text-error transition-colors"
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
      <p className={`text-sm mb-3 ${isCompleted ? "line-through text-primary/50" : "text-primary/80"}`}>
        {task.description}
      </p>
      <div className="flex items-center justify-between">
        {isCompleted ? (
          <span className="inline-flex items-center text-xs text-success">
            <CheckCircleIcon className="mr-1 h-3 w-3" />
            Completed!
          </span>
        ) : formattedDate ? (
          <span className="inline-flex items-center text-xs text-primary/70">
            <CalendarIcon className="mr-1 h-3 w-3" />
            Due: {formattedDate}
          </span>
        ) : (
          <span></span>
        )}
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTagColorClass(task.tag)}`}>
          {getTagEmoji(task.tag)} {task.tag}
        </span>
      </div>
      
      {/* Add cute decorative corner */}
      {!isCompleted && (
        <div className="absolute bottom-1 right-1 text-primary/20 text-xs">♡</div>
      )}
    </div>
  );
}
