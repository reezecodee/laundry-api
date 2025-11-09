import {
  LoginResponse,
  LoginRequestDTO,
  toLoginResponse,
  RequestRegisterDTO,
  RegisterResponse,
  toRegisterResponse,
} from "../dtos/auth.dto";
import { ResponseError } from "../errors/response-error";
import AuthRepository from "../repositories/auth-repository";
import { comparePassword, hashPassword } from "../utils/password";
import { AuthValidator } from "../validators/auth.validator";
import { Validator } from "../validators/validator";
import jwt from "jsonwebtoken";

class AuthService {
  static async login(data: LoginRequestDTO): Promise<LoginResponse> {
    const validated = Validator.validate(AuthValidator.LOGIN, data);
    const user = await AuthRepository.findByUsername(validated.username);

    if (!user) {
      throw new ResponseError(403, "Username atau password salah");
    }

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new ResponseError(403, "Username atau password salah");
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const accessSecret = process.env.ACCESS_TOKEN_SECRET!;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET!;

    if (!accessSecret || !refreshSecret) {
      throw new ResponseError(500, "Server Error!");
    }

    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: "7d",
    });

    return toLoginResponse(user, accessToken, refreshToken);
  }

  static async register(data: RequestRegisterDTO): Promise<RegisterResponse> {
    const validated = Validator.validate(AuthValidator.REGISTER, data);
    const existingUser = await AuthRepository.findByUsername(
      validated.username
    );

    if (existingUser) {
      throw new ResponseError(
        409,
        "Username sudah terdaftar, silahkan gunakan username lain."
      );
    }

    validated.password = await hashPassword(validated.password);
    const { confirmPassword, ...registerData } = validated;

    const newUser = await AuthRepository.register(registerData);

    return toRegisterResponse(newUser);
  }
}

export default AuthService;
