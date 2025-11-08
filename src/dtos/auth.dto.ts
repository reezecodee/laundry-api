import { User } from "../entities/user";

export interface RequestLoginDTO {
  username: string;
  password: string;
}

export interface AuthPayload {
  id: number;
  username: string;
}

export interface LoginResponse {
  user: AuthPayload
  accessToken: string;
  refreshToken: string;
}

export function toLoginResponse(
  user: User,
  accessToken: string,
  refreshToken: string
): LoginResponse {
  return {
    user: {
      id: user.id,
      username: user.username,
    },
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}
