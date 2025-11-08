import {
  LoginResponse,
  RequestLoginDTO,
  toLoginResponse,
} from "../dtos/auth.dto";
import { ResponseError } from "../errors/response-error";
import AuthRepository from "../repositories/auth-repository";
import { comparePassword } from "../utils/password";
import { AuthValidator } from "../validators/auth.validator";
import { Validator } from "../validators/validator";
import jwt from "jsonwebtoken";

class AuthService {
  static async login(data: RequestLoginDTO): Promise<LoginResponse> {
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
}

export default AuthService;
