import {useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";


import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TaskCard } from "@/components/TaskCard";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DeleteTask, GetAllTasks, UpdateTask } from "@/api/http";
import type { TaskData } from "@/lib/type";
import DashboardNavbar from "@/layout/DashboardNavbar";


const Dashboard = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskData | null>(null);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const {mutate: updateTask } = useMutation({
    mutationKey: ["update-task"],
    mutationFn: (task: TaskData) => UpdateTask(task.id!, task),
  });

  const { data: fetchedTasks, isLoading: taskLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: GetAllTasks,
  });

  const {mutate: deletedTask } = useMutation({ 
    mutationKey: ["delete-task"],
    mutationFn: (task: TaskData) => DeleteTask(task.id!),
  })

  useEffect(() => {
    if (fetchedTasks) {
      setTasks(fetchedTasks);
    }
  }, [fetchedTasks]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      toast.success("Task reordered");
    }
  };

  const handleUpdateTask = () => {
    if (!editingTask || !newTask.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    updateTask({
      id: editingTask.id,
      title: newTask.title,
      description: newTask.description,
      isCompleted: editingTask.isCompleted,
    });

    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, title: newTask.title, description: newTask.description }
          : task
      )
    );
    setNewTask({ title: "", description: "" });
    setEditingTask(null);
    setIsDialogOpen(false);
    toast.success("Task updated successfully");
  };

  const handleDeleteTask = (id: string) => {
    deletedTask({ id });
    setTasks(tasks.filter((task: TaskData) => task.id !== String(id)));
    toast.success("Task deleted successfully");
  };

  const openEditDialog = (task: TaskData) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description || "" });
    setIsDialogOpen(true);
  };

  // const closeDialog = () => {
  //   setIsDialogOpen(false);
  //   setEditingTask(null);
  //   setNewTask({ title: "", description: "" });
  // };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">

          <DashboardNavbar
            handleUpdateTask={handleUpdateTask}
            setTasks={setTasks}
            tasks={tasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />

          <main className="container mx-auto px-4 py-8">
            {taskLoading ? (
              <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <CardTitle>No tasks yet</CardTitle>
                  <CardDescription>
                    Create your first task to get started
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={fetchedTasks.map((task:TaskData) => task.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={fetchedTasks?.find((t:TaskData) => t.id === task.id) || task}
                        onEdit={openEditDialog}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
