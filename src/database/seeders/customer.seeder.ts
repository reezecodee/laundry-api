import { AppDataSource } from "../../config/data-source";
import { Customer, CustomerType } from "../../entities/customer";

export async function customerSeeder() {
  console.log("🌱 Seeding customers...");

  const customerRepo = AppDataSource.getRepository(Customer);
  const customerToInsert: CustomerType[] = [
    {
      namaPelanggan: "Udin Dindun",
      nomorTelepon: "089988776622",
      alamat: "Jl. Kemerdekaan",
    },
    {
      namaPelanggan: "Tralalelo Tralala",
      nomorTelepon: "089988776633",
      alamat: "Jl. Tanuwijaya",
    },
    {
      namaPelanggan: "Boneca Ambalabu",
      nomorTelepon: "089988776644",
      alamat: "Jl. Wiriadinata",
    },
  ];

  try {
    await customerRepo.insert(customerToInsert);
    console.log(`✅ Customers seeded successfully`);
  } catch (error) {
    console.error("❌ Error seeding customers:", error);
    throw new Error("Customer seeder bermasalah.");
  }
}
