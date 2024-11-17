import { useState } from "react";
import { AddTask } from "@/components/AddTask";
import { TaskList } from "@/components/TaskList";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAddTask = (task: string) => {
    setTasks([...tasks, task]);
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

  const handleEditTask = (index: number, newText: string) => {
    const newTasks = [...tasks];
    newTasks[index] = newText;
    setTasks(newTasks);
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
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
          />
        </div>
      </div>
    </div>
  );
};

export default Index;