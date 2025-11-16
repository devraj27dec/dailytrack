import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { toast } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useMutation } from "@tanstack/react-query";
import { CreateTask } from "@/api/http";
import type { TaskData } from "@/lib/type";



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


  const {mutate} = useMutation({
    mutationKey: ['add-task'],
    mutationFn: (task: TaskData) => CreateTask(task) 
  })
 
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
  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const task: TaskData = {
      title: newTask.title,
      description: newTask.description
    };

    mutate({
      title: task.title,
      description: task.description,
    })

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "" });
    setIsDialogOpen(false);
    toast.success("Task created successfully");
  };

  const handleUpdateTask = () => {
    if (!editingTask || !newTask.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

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
    setTasks(tasks.filter((task) => task.id !== Number(id)));
    toast.success("Task deleted successfully");
  };

  const openEditDialog = (task: TaskData) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task
.description  || ""
     });
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
          <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Task Dashboard
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Manage your tasks with drag and drop
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Dialog
                  open={isDialogOpen}
                  onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) {
                      setEditingTask(null);
                      setNewTask({ title: "", description: "" });
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      New Task
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingTask ? "Edit Task" : "Create New Task"}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          placeholder="Task title"
                          value={newTask.title}
                          onChange={(e) =>
                            setNewTask({ ...newTask, title: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea
                          placeholder="Task description"
                          value={newTask.description}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              description: e.target.value,
                            })
                          }
                          rows={4}
                        />
                      </div>

                      <Button
                        className="w-full"
                        onClick={
                          editingTask ? handleUpdateTask : handleCreateTask
                        }
                      >
                        {editingTask ? "Update Task" : "Create Task"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            {tasks.length === 0 ? (
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
                  items={tasks.map((task) => task.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
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
