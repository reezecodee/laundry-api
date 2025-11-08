import { AppDataSource } from "../../config/data-source";
import { customerSeeder } from "./customer.seeder";
import { serviceSeeder } from "./service.seeder";
import { userSeeder } from "./user.seeder";

async function runSeeder() {
  try {
    console.log("Memulai proses seeder...");
    await AppDataSource.initialize();

    // proses seeder
    await userSeeder();
    await customerSeeder();
    await serviceSeeder()

    console.log("Proses seeder berhasil di eksekusi.");
  } catch (error) {
    console.error("Terjadi kesalahan pada saat proses seeder,", error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

runSeeder();
