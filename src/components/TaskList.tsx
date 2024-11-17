import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: string[];
  onDelete: (index: number) => void;
  onEdit: (index: number, newText: string) => void;
}

export const TaskList = ({ tasks, onDelete, onEdit }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          onDelete={() => onDelete(index)}
          onEdit={(newText) => onEdit(index, newText)}
        />
      ))}
    </div>
  );
};