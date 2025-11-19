import { UserSchema } from "../types/index.js";
import type { Request, Response } from "express";
import bcrypt  from 'bcryptjs'
import { prisma } from "../lib/prismaClient.js";
import { generateToken } from "../lib/jwt.js";


export async function registerUser (req: Request, res: Response){
    try {

        const { username, email , password } = req.body;
        const user = UserSchema.safeParse(req.body);

        if (!user.success) {
            return res.status(400).json({ message: 'Invalid user data', errors: user.error });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        console.log('Registering user:', newUser);

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export async function UserLogin(req: Request , res: Response) {
    try {
        const {email , password} = await req.body;

        if(!password && !email){
            return res.status(400).json({"msg":"Invalid Login Credentials"})
        }
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
        return res.status(400).json({ msg: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        const token = generateToken(user.id)
        // console.log("token" , token)

        const details = {
            "access_token": token,
            "username": user.username
        }

        return res.status(201).json({"msg":"User LoggedIn Successfull" , "details": details})
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const googleAuthRedirect = (req: Request, res: Response) => {
  const user = req.user as any;
  if (!user) return res.status(401).json({ message: "Authentication failed" });
  const token = generateToken(user.id);
  return res.status(201).json({ message: "Login successful", token });
};
