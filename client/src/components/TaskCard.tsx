import { useDrag } from "react-dnd";
import { PencilIcon, TrashIcon, CalendarIcon, CheckCircleIcon, HeartIcon, StarIcon } from "lucide-react";
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

  // Get tag color class based on tag name - with cute pastel colors
  function getTagColorClass(tag) {
    switch (tag) {
      case "Development":
        return "bg-lime-100 text-lime-700 border border-lime-200";
      case "Design":
        return "bg-sky-100 text-sky-700 border border-sky-200";
      case "Documentation":
        return "bg-violet-100 text-violet-700 border border-violet-200";
      case "Bug":
        return "bg-rose-100 text-rose-700 border border-rose-200";
      case "Feature":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
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
      className={`task-card relative p-4 rounded-xl mb-3 cursor-move transition-all shadow-sm ${
        isCompleted 
          ? "bg-teal-50/70 border border-teal-200" 
          : task.status === "in-progress"
            ? "bg-fuchsia-50/70 border border-fuchsia-200"
            : "bg-pink-50/70 border border-pink-200"
      } ${isDragging ? "opacity-60 scale-105" : "hover:shadow-md hover:-translate-y-1"}`}
      style={{ opacity: isDragging ? 0.6 : 1 }}
    >
      {/* Corner decorations */}
      <div className="absolute -top-1 -right-1">
        {task.status === "in-progress" ? (
          <StarIcon className="h-5 w-5 text-secondary" fill="#d8b4fe" />
        ) : isCompleted ? (
          <div className="bg-success rounded-full p-1">
            <CheckCircleIcon className="h-3 w-3 text-white" />
          </div>
        ) : (
          <HeartIcon className="h-5 w-5 text-primary" fill="#fbcfe8" />
        )}
      </div>

      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-medium ${isCompleted ? "line-through text-primary/50" : "text-primary"}`}>
          {task.title}
        </h3>
        <div className="task-actions flex space-x-1">
          <button
            className="edit-task-btn p-1 text-primary/60 hover:text-primary transition-colors rounded-full hover:bg-primary/10"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit task"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            className="delete-task-btn p-1 text-primary/60 hover:text-error transition-colors rounded-full hover:bg-error/10"
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

      <div className="flex items-center justify-between mt-2">
        {isCompleted ? (
          <span className="inline-flex items-center text-xs text-success">
            <CheckCircleIcon className="mr-1 h-3 w-3" />
            Completed!
          </span>
        ) : formattedDate ? (
          <span className="inline-flex items-center text-xs text-primary/70 bg-primary/5 px-2 py-1 rounded-full">
            <CalendarIcon className="mr-1 h-3 w-3" />
            Due: {formattedDate}
          </span>
        ) : (
          <span></span>
        )}
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTagColorClass(task.tag)}`}>
          {getTagEmoji(task.tag)} {task.tag}
        </span>
      </div>
      
      {/* Add a cute dotted border at the bottom */}
      <div className="absolute bottom-0 left-4 right-4 h-[1px] border-b border-dotted border-primary/20"></div>
    </div>
  );
}
