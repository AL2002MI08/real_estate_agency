import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  <T extends z.ZodTypeAny>(schema: T) =>
  (req: Request<unknown, unknown, z.infer<T>>, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.issues.map(issue => ({
            field: issue.path.join("."),
            message: issue.message,
          }))
        });
      }
      next(error);
    }
  };