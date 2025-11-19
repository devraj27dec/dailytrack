import type { Request , Response } from "express";
import { TaskSchema } from "../types/index.js";
import { prisma } from "../lib/prismaClient.js";

export async function CreateTask(req: Request, res: Response) {
  try {
    const parsed = TaskSchema.safeParse(req.body);
    
    console.log("Parsed Task Data:", parsed);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        "msg": "Invalid task data",
      });
    }

    const userId = (req.user as { userId: string }).userId;

    const { title, description , isCompleted} = parsed.data;

    const task = await prisma.task.create({
      data: {
        title,
        description: description ?? null,
        isCompleted: isCompleted ?? false,
        userId: userId as string,
      },
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


export async function getAllTasks(req:Request , res:Response) {
  try {
    const tasks = await prisma.task.findMany()    
    return res.status(201).json(tasks)
  } catch (error) {
   return res.status(500).json({
    message:"Internal Server Error"
   }) 
  }
}


export async function getTask(req: Request , res: Response) {
  try {
    const taskId = req.params.id;
    if(!taskId)
      return res.status(402).json({"message": "Task Not Found"})

    const task = await prisma.task.findFirst({
      where: {
        id: taskId
      }
    })
    return res.status(201).json({task})
  } catch (error) {
    console.log("Error fetching task:", error);
    return res.status(500).json({
    message:"Internal Server Error"

   }) 
  }
}

export async function clearTaskHistory(req:Request , res:Response) {
  try {
    await prisma.task.deleteMany()
    return res.status(201).json({"message":"Tasks Deleted successfully"})
  } catch (error) {
    return res.status(500).json({
    message:"Internal Server Error"
   }) 
  }  
}

export async function deleteTask(req: Request , res:Response) {
  try {
    const taskId = req.params.id;

    if(!taskId) {
      return res.status(402).json({ message: "Task Not Found" });
    }
    
    const existingTask = await prisma.task.findUnique({ 
      where: { 
        id: taskId, 
      }
    });

    if(!existingTask) {
      return res.status(404).json({ message: "Task does not exist" });
    }

    await prisma.task.delete({ where: { 
      id: taskId
     } });
    
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({
    message:"Internal Server Error"
   }) 
  }
}


export async function updateTask(req: Request , res:Response) {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body; 
    if(!id)
      return res.status(402).json({"message": "Task Not Found"})  
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        isCompleted   
      }
    });
    return res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.log("Error updating task:", error);
    return res.status(500).json({ 
      message: "Internal Server Error"
     });
  }   
}

export async function markedTaskComplete(req:Request , res:Response) {
  try {
    const { id } = req.params;
    if(!id)
      return res.status(402).json({"message": "Task Not Found"})  
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { isCompleted: true }
    });
    return res.status(200).json({ message: "Task marked as complete", updatedTask });
  }
   catch (error) { 
    console.log("Error marking task as complete:", error);
    return res.status(500).json({ 
      message: "Internal Server Error"
     });
  }
}