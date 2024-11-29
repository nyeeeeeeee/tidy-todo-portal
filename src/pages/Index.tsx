import { useState } from "react";
import { AddTask } from "@/components/AddTask";
import { TaskList } from "@/components/TaskList";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

type FilterType = "all" | "completed" | "uncompleted";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const handleAddTask = (title: string, description: string) => {
    setTasks([...tasks, { title, description, completed: false }]);
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index: number, newTitle: string, newDescription: string) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], title: newTitle, description: newDescription };
    setTasks(newTasks);
  };

  const handleToggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], completed: !newTasks[index].completed };
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F6F8FA] py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-500 mb-6">
            Keep track of your daily tasks and stay organized.
          </p>
          <AddTask onAdd={handleAddTask} />
          
          <div className="my-4">
            <ToggleGroup type="single" value={filter} onValueChange={(value: FilterType) => setFilter(value || "all")}>
              <ToggleGroupItem value="all" aria-label="Show all tasks">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="completed" aria-label="Show completed tasks">
                Completed
              </ToggleGroupItem>
              <ToggleGroupItem value="uncompleted" aria-label="Show uncompleted tasks">
                Uncompleted
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <TaskList
            tasks={filteredTasks}
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