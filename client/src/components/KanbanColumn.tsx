import { useDrop } from "react-dnd";
import { TaskCard } from "./TaskCard";
import { PlusIcon, InboxIcon, CheckCircleIcon, HeartIcon } from "lucide-react";

export function KanbanColumn({
  id,
  title,
  color,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onClearCompleted,
  moveTask
}) {
  // Set up drop target for drag and drop
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => {
      if (item.status !== id) {
        moveTask(item.id, id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className="kanban-column h-[calc(100vh-280px)] flex flex-col rounded-2xl border border-primary/20 overflow-hidden relative backdrop-blur-sm bg-white/70">
      {/* Column Header */}
      <div className={`column-header p-4 border-b border-primary/20 ${id === "todo" ? "bg-pink-100" : id === "in-progress" ? "bg-purple-100" : "bg-teal-100"} relative`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${color}`}></div>
            <h2 className="font-bold text-primary">{title}</h2>
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center">
            {onClearCompleted && (
              <button 
                className="text-xs text-primary/70 hover:text-error mr-2"
                onClick={onClearCompleted}
              >
                Clear all
              </button>
            )}
            <button
              className="add-task-column-btn text-primary/70 hover:text-primary p-1 rounded-md transition-colors"
              onClick={onAddTask}
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        ref={drop}
        className={`column-drop-zone flex-1 p-3 overflow-y-auto ${
          isOver ? "bg-primary/5 border-2 border-dashed border-primary/30" : ""
        }`}
      >
        {/* Task Cards */}
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))
        ) : (
          <div className="empty-column-message flex flex-col items-center justify-center py-8 text-center text-primary/50">
            {id === "completed" ? (
              <>
                <CheckCircleIcon className="h-8 w-8 mb-2 text-primary" />
                <p>No completed tasks yet</p>
                <p className="text-xs mt-1">Finish something amazing! ✨</p>
              </>
            ) : (
              <>
                <InboxIcon className="h-8 w-8 mb-2 text-primary" />
                <p>No tasks yet</p>
                <button
                  className="add-task-empty-btn mt-2 text-primary hover:text-primary/90 text-sm font-medium rounded-full px-4 py-1 bg-primary/10 hover:bg-primary/20 transition-colors"
                  onClick={onAddTask}
                >
                  ✨ Add a cute task ✨
                </button>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-2 right-3 text-primary/50 text-lg">✿</div>
      <div className="absolute bottom-2 left-3 text-primary/30">
        <HeartIcon className="h-4 w-4" />
      </div>
    </div>
  );
}
