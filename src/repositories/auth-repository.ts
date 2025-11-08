import { AppDataSource } from "../config/data-source";
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
      },
    });
  }
}

export default AuthRepository;
