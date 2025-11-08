import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../types";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    req.headers.authorization || (req.headers.authorization as string);

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      statusCode: 401,
      message: "Unauthorized: No Token Provided",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({
          statusCode: 403,
          message: "Forbidden: Invalid Token",
        });
      }

      const payload = decoded as CustomJwtPayload;

      req.user = {
        id: payload.userInfo.id,
        username: payload.userInfo.username,
      };

      next();
    }
  );
};
