import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth-service";
import {
  AuthPayload,
  LoginRequestDTO,
  RequestRegisterDTO,
} from "../dtos/auth.dto";
import jwt from "jsonwebtoken";

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await AuthService.login(
        req.body as LoginRequestDTO
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
      });

      res.status(200).json({
        statusCode: 200,
        message: "Login successful",
        data: user,
        accessToken: accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body as RequestRegisterDTO);

      res.status(201).json({
        statusCode: 201,
        message: "Register successful",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async handleRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        statusCode: 401,
        message: "Sesi tidak ditemukan. Silakan login kembali.",
      });
    }

    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as AuthPayload;

      const newPayload = {
        id: payload.id,
        username: payload.username,
        role: payload.role,
      };

      const newAccessToken = jwt.sign(
        newPayload,
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Token berhasil diperbarui",
        accessToken: newAccessToken,
      });
    } catch (error) {
      return res.status(403).json({
        statusCode: 403,
        message: "Sesi tidak valid. Silakan login kembali.",
      });
    }
  }

  static handleLogout(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(204).json({
        statusCode: 204,
        message: "Tidak ada sesi untuk logout.",
      });
    }

    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.status(200).json({
        statusCode: 200,
        message: "Logout berhasil",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
