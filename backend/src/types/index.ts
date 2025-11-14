import z from "zod";


export const UserSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(30),
    password: z.string().min(6)
})

export type User = z.infer<typeof UserSchema>;

export const TaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    isCompleted: z.boolean().default(false),
    userId: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(), 
});

export type Task = z.infer<typeof TaskSchema>;