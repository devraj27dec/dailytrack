import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Pencil, Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string | Date; // <-- FIXED
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="group relative hover:shadow-lg transition-shadow">
        
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        <CardHeader className="pl-10">
          <CardTitle className="text-lg line-clamp-1">{task.title}</CardTitle>
          <CardDescription className="text-xs">
            {task.description || "No Description"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => onEdit(task)}
            >
              <Pencil className="h-3 w-3" />
              Edit
            </Button>

            <Button
              size="sm"
              variant="destructive"
              className="flex-1 gap-2"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
