import { useState } from "react";
import { AddTask } from "@/components/AddTask";
import { TaskList } from "@/components/TaskList";
import { Clock } from "@/components/Clock";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Task {
  title: string;
  description: string;
  completed: boolean;
  pinned?: boolean;
}

type FilterType = "all" | "completed" | "uncompleted";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const handleAddTask = (title: string, description: string) => {
    setTasks([...tasks, { title, description, completed: false, pinned: false }]);
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

  const handlePinTask = (index: number) => {
    setTasks(prevTasks => {
      const newTasks = [...prevTasks];
      // Toggle the pin state of the clicked task
      newTasks[index] = { ...newTasks[index], pinned: !newTasks[index].pinned };
      return newTasks;
    });
  };

  const sortTasks = (tasksToSort: Task[]) => {
    return [...tasksToSort].sort((a, b) => {
      if (a.pinned === b.pinned) return 0;
      return a.pinned ? -1 : 1;
    });
  };

  const filteredTasks = sortTasks(
    tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "uncompleted") return !task.completed;
      return true;
    })
  );

  return (
    <div className="min-h-screen bg-[#F6F8FA] py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
              <p className="text-gray-500">
                Keep track of your daily tasks and stay organized.
              </p>
            </div>
            <Clock />
          </div>
          
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
            onPin={handlePinTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;