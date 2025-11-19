import { CreateTask } from "@/api/http";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import type { TaskData } from "@/lib/type";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";


interface DashboardNavbarProps {
  tasks: TaskData[];
  setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>;
  handleUpdateTask: () => void;
  editingTask: TaskData | null;
  setEditingTask: React.Dispatch<React.SetStateAction<TaskData | null>>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}




export default function DashboardNavbar({
  tasks,
  setTasks,
  handleUpdateTask,
  editingTask,
  setEditingTask,
  isDialogOpen,
  setIsDialogOpen,
}: DashboardNavbarProps) {
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const { mutate } = useMutation({
    mutationKey: ["add-task"],
    mutationFn: (task: TaskData) => CreateTask(task),
  });


  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const task: TaskData = {
      title: newTask.title,
      description: newTask.description,
    };

    mutate({
      title: task.title,
      description: task.description,
    });

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "" });
    setIsDialogOpen(false);
    toast.success("Task created successfully");
  };

  return (
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
          <div>
            <ModeToggle />
          </div>
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
                  <label className="text-sm font-medium">Description</label>
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
                  onClick={editingTask ? handleUpdateTask : handleCreateTask}
                >
                  {editingTask ? "Update Task" : "Create Task"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
