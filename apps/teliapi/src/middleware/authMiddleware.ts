import { type Request, type Response, type NextFunction } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(401).json({ error: "unauthenticated" });
  // next();
}
