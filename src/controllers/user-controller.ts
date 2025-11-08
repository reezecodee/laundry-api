import { Request, Response, NextFunction } from "express";

class UserController {
  static async getUsers(req: Request, res: Response, next: NextFunction) {}

  static async create(req: Request, res: Response, next: NextFunction) {
    return "sa";
  }

  static async update(req: Request, res: Response, next: NextFunction) {}

  static async delete(req: Request, res: Response, next: NextFunction) {}
}

export default UserController;
