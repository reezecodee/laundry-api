import { User } from "../entities/user";

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface AuthPayload {
  id: number;
  username: string;
}

export interface LoginResponse {
  user: AuthPayload;
  accessToken: string;
  refreshToken: string;
}

export interface RequestRegisterDTO {
  name: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface RegisterResponse {
  id: number;
  name: string;
  username: string;
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

export function toRegisterResponse(user: User): RegisterResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
  };
}
