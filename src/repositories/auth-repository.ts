import { AppDataSource } from "../config/data-source";
import { RequestRegisterDTO } from "../dtos/auth.dto";
import { User } from "../entities/user";

class AuthRepository {
  static async findByUsername(username: string) {
    const userRepository = AppDataSource.getRepository(User);

    return await userRepository.findOne({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
      },
    });
  }

  static async register(data: RequestRegisterDTO) {
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create(data);

    return await userRepository.save(newUser);
  }
}

export default AuthRepository;
