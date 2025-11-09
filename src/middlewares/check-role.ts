import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/user";
import { ResponseError } from "../errors/response-error";

export const checkRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ResponseError(401, "Unauthorized");
    }

    const isAllowed = allowedRoles.includes(req.user.role);

    if (!isAllowed) {
      throw new ResponseError(
        403,
        "Forbidden: Anda tidak memiliki akses ke sumber daya ini"
      );
    }

    next();
  };
};
