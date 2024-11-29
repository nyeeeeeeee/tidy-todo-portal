import { TaskItem } from "./TaskItem";

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (index: number) => void;
  onEdit: (index: number, newTitle: string, newDescription: string) => void;
  onToggle: (index: number) => void;
}

export const TaskList = ({ tasks, onDelete, onEdit, onToggle }: TaskListProps) => {
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
          onEdit={(newTitle, newDescription) => onEdit(index, newTitle, newDescription)}
          onToggle={() => onToggle(index)}
        />
      ))}
    </div>
  );
};