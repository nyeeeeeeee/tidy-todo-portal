import { useState } from "react";
import { Check, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TaskItemProps {
  task: string;
  onDelete: () => void;
  onEdit: (newText: string) => void;
}

export const TaskItem = ({ task, onDelete, onEdit }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task);

  const handleSubmit = () => {
    if (editedText.trim()) {
      onEdit(editedText);
      setIsEditing(false);
    }
  };

  return (
    <div className="task-item flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-3">
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-1"
            autoFocus
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          />
          <Button onClick={handleSubmit} size="icon" variant="ghost">
            <Check className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span className="flex-1 text-left">{task}</span>
          <Button
            onClick={() => setIsEditing(true)}
            size="icon"
            variant="ghost"
            className="text-gray-500 hover:text-primary"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            onClick={onDelete}
            size="icon"
            variant="ghost"
            className="text-gray-500 hover:text-destructive"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};