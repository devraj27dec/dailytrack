import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function Authenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = await req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_JWT_SECRET!) as Express.UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
