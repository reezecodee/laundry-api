import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload {
  userInfo: {
    id: number;
    username: string;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
      };
    }
  }
}
