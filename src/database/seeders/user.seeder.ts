import { AppDataSource } from "../../config/data-source";
import { User, UserType, UserRole } from "../../entities/user";
import { hashPassword } from "../../utils/password";

export async function userSeeder() {
  console.log("🌱 Seeding users...");

  const userRepo = AppDataSource.getRepository(User);
  const userToInsert: UserType[] = [
    {
      name: "Muhammad Azmi Avicenna",
      username: "avicenna25",
      password: await hashPassword("12345678"),
      role: UserRole.ADMIN,
    },
    {
      name: "Atyla Azfa Al Harits",
      username: "harits25",
      password: await hashPassword("12345678"),
      role: UserRole.KASIR,
    },
  ];

  try {
    await userRepo.insert(userToInsert);
    console.log(`✅ Users seeded successfully`);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    throw new Error("User seeder bermasalah.");
  }
}
