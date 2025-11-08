import { z, ZodType } from "zod";
import { Unit } from "../entities/service";

export class ServiceValidator {
  static readonly CREATE: ZodType = z.object({
    namaLayanan: z
      .string({ message: "Nama layanan harus berupa teks." })
      .trim()
      .min(5, "Nama layanan minimal berisi 5 karakter.")
      .max(255, {
        message: "Nama layanan tidak boleh lebih dari 255 karakter.",
      }),
    harga: z
      .number({ message: "Harga harus berisi angka." })
      .positive({
        message: "Harga harus bernilai positif (tidak boleh 0 atau negatif).",
      })
      .int({ message: "Harga harus berupa bilangan bulat." }),
    satuan: z
      .enum(Unit, { message: "Satuan harus berupa KG atau PCS." })
      .default(Unit.KG),
    deskripsi: z.string({ message: "Deskripsi harus berupa teks." }).nullable(),
  });
}
