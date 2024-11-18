import { useState } from "react";
import { AddTask } from "@/components/AddTask";
import { TaskList } from "@/components/TaskList";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  const handleAddTask = (title: string, description: string) => {
    setTasks([...tasks, { title, description, completed: false }]);
    toast({
      title: "Task added",
      description: "Your new task has been added to the list.",
    });
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
    });
  };

  const handleEditTask = (index: number, newTitle: string, newDescription: string) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], title: newTitle, description: newDescription };
    setTasks(newTasks);
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const handleToggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], completed: !newTasks[index].completed };
    setTasks(newTasks);
    toast({
      title: newTasks[index].completed ? "Task completed" : "Task uncompleted",
      description: newTasks[index].completed
        ? "Great job! The task has been marked as complete."
        : "The task has been marked as incomplete.",
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-500 mb-6">
            Keep track of your daily tasks and stay organized.
          </p>
          <AddTask onAdd={handleAddTask} />
          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onToggle={handleToggleTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;