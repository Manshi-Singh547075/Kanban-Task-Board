import { useDrop } from "react-dnd";
import { Task, TaskStatus } from "@/types/index";
import { TaskCard } from "./TaskCard";
import { useTaskContext } from "@/context/TaskContext";
import { PlusIcon, InboxIcon, CheckCircleIcon } from "lucide-react";

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onClearCompleted?: () => void;
}

export function KanbanColumn({
  id,
  title,
  color,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onClearCompleted,
}: KanbanColumnProps) {
  const { moveTask } = useTaskContext();

  // Set up drop target
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item: { id: string; status: TaskStatus }) => {
      if (item.status !== id) {
        moveTask(item.id, id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className="kanban-column h-[calc(100vh-250px)] flex flex-col bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      {/* Column Header */}
      <div className="column-header p-4 border-b border-neutral-200 dark:border-neutral-700 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${color}`}></div>
            <h2 className="font-semibold text-neutral-800 dark:text-neutral-100">{title}</h2>
            <span className="text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center">
            {onClearCompleted && (
              <button 
                className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-error dark:hover:text-error mr-2"
                onClick={onClearCompleted}
              >
                Clear all
              </button>
            )}
            <button
              className="add-task-column-btn text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary p-1 rounded-md transition-colors"
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
          isOver ? "bg-primary bg-opacity-5" : ""
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
          <div className="empty-column-message flex flex-col items-center justify-center py-8 text-center text-neutral-400 dark:text-neutral-500">
            {id === "completed" ? (
              <>
                <CheckCircleIcon className="h-8 w-8 mb-2" />
                <p>No completed tasks</p>
              </>
            ) : (
              <>
                <InboxIcon className="h-8 w-8 mb-2" />
                <p>No tasks yet</p>
                <button
                  className="add-task-empty-btn mt-2 text-primary hover:text-primary/90 text-sm font-medium"
                  onClick={onAddTask}
                >
                  + Add a task
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
