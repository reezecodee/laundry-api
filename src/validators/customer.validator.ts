import { z, ZodType } from "zod";

export class CustomerValidator {
  static readonly CREATE: ZodType = z.object({
    namaPelanggan: z
      .string({ message: "Nama pelanggan harus berupa teks." })
      .trim()
      .min(5, { message: "Nama pelanggan minimal harus berisi 5 karakter." })
      .max(255, {
        message: "Nama pelanggan tidak boleh lebih dari 255 karakter.",
      })
      .regex(/^\D*$/, {
        message: "Nama pelanggan tidak boleh mengandung angka.",
      }),
    nomorTelepon: z
      .string({ message: "Nomor telepon harus berupa teks." })
      .trim()
      .min(11, "Nomor telepon harus berisi 11 digit angka.")
      .max(15, "Nomor telepon maksimal berisi 15 digit angka.")
      .regex(/^[0-9+()-\s]*$/, {
        message: "Nomor telepon tidak boleh mengandung huruf.",
      }),
    alamat: z.string({ message: "Alamat harus berupa teks." }).nullable(),
  });

  static readonly UPDATE: ZodType = z.object({
    namaPelanggan: z
      .string({ message: "Nama pelanggan harus berupa teks." })
      .trim()
      .min(5, { message: "Nama pelanggan minimal harus berisi 5 karakter." })
      .max(255, {
        message: "Nama pelanggan tidak boleh lebih dari 255 karakter.",
      })
      .regex(/^\D*$/, {
        message: "Nama pelanggan tidak boleh mengandung angka.",
      })
      .optional(),
    nomorTelepon: z
      .string({ message: "Nomor telepon harus berupa teks." })
      .trim()
      .min(11, "Nomor telepon harus berisi 11 digit angka.")
      .max(15, "Nomor telepon maksimal berisi 15 digit angka.")
      .regex(/^[0-9+()-\s]*$/, {
        message: "Nomor telepon tidak boleh mengandung huruf.",
      })
      .optional(),
    alamat: z.string({ message: "Alamat harus berupa teks." }).nullable(),
  });
}
