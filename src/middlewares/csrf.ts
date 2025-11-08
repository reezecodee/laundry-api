import { Request, Response, NextFunction } from "express";

export const verifyCSRF = (req: Request, res: Response, next: NextFunction) => {
  const csrfHeader = req.headers["x-csrf-token"] as string;
  const csrfCookie = req.cookies["csrf-token"];

  if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
    return res.status(403).json({
      statusCode: 403,
      message: "Forbidden: Invalid CSRF Token",
    });
  }

  next();
};

// csrf token sudah tidak di butuhkan lagi karena sudah pakai cors
