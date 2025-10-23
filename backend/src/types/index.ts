import z from "zod";


export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    username: z.string().min(3).max(30),
    password: z.string().min(6),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const TaskSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    isCompleted: z.boolean().default(false),
    userId: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(), 
});

export type Task = z.infer<typeof TaskSchema>;