import type { Request , Response } from "express";
import { TaskSchema } from "../types/index.js";
import { prisma } from "../lib/prismaClient.js";

export async function CreateTask(req: Request, res: Response) {
  try {
    const parsed = TaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid task data",
      });
    }

    const { title, description, isCompleted, userId } = parsed.data;

    const task = await prisma.task.create({
      data: {
        title,
        description: description ?? null,
        isCompleted,
        userId,
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
    const taskId = req.params;
    if(!taskId)
      return res.status(402).json({"message": "Task Not Found"})

    const task = await prisma.task.findFirst({
      where: {
        id: taskId
      }
    })
    return res.status(201).json({task})
  } catch (error) {
    return res.status(500).json({
    message:"Internal Server Error"
   }) 
  }
}


export async function  deleteTask(req: Request , res:Response) {
  try {
    const { id } = req.params;

    if(!id)
      return res.status(402).json({"message": "Task Not Found"})

    const existingTask = await prisma.task.findUnique({ where: { id } });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({ where: { id } });
    
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
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
