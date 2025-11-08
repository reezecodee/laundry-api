import { AppDataSource } from "../../config/data-source";
import { Service, ServiceType, Unit } from "../../entities/service";

export async function serviceSeeder() {
  console.log("🌱 Seeding services...");

  const serviceRepo = AppDataSource.getRepository(Service);
  const serviceToInsert: ServiceType[] = [
    {
      namaLayananan: "Cuci Setrika Kiloan",
      harga: 7000,
      satuan: Unit.KG,
      deskripsi: "Pakaian dicuci, dikeringkan, dan disetrika. Minimal 3kg.",
    },
    {
      namaLayananan: "Cuci Kiloan Express (1 Hari)",
      harga: 12000,
      satuan: Unit.KG,
      deskripsi: "Layanan cuci setrika selesai dalam 24 jam.",
    },
    {
      namaLayananan: "Cuci Selimut (Ukuran Double)",
      harga: 20000,
      satuan: Unit.PCS,
      deskripsi: "Cuci bersih 1 buah selimut ukuran double/king.",
    },
    {
      namaLayananan: "Cuci Sepatu Sneakers",
      harga: 35000,
      satuan: Unit.PCS,
      deskripsi: "Cuci bersih 1 pasang sepatu sneakers.",
    },
    {
      namaLayananan: "Jasa Setrika Saja",
      harga: 4000,
      satuan: Unit.KG,
      deskripsi: "Hanya jasa setrika, pakaian dibawa dalam keadaan kering.",
    },
  ];

  try {
    await serviceRepo.insert(serviceToInsert);
    console.log(`✅ Services seeded successfully`);
  } catch (error) {
    console.error("❌ Error seeding services:", error);
    throw new Error("Service seeder bermasalah.");
  }
}
