import { z, ZodType } from "zod";
import { UserRole } from "../entities/user";

export class UserValidator {
  static readonly CREATE: ZodType = z.object({
    name: z
      .string({ message: "Nama harus berupa teks." })
      .trim()
      .min(5, { message: "Nama minimal harus berisi 5 karakter." })
      .max(255, { message: "Nama tidak boleh lebih dari 255 karakter." })
      .regex(/^\D*$/, { message: "Nama tidak boleh mengandung angka." }),
    username: z
      .string({ message: "Username harus berupa teks." })
      .trim()
      .min(5, { message: "Username  minimal harus berisi 5 karakter." })
      .max(50, { message: "Username tidak boleh lebih dari 50 karakter." }),
    password: z
      .string({ message: "Password harus berupa teks." })
      .min(8, { message: "Password minimal harus berisi 8 karakter." })
      .max(255, { message: "Password tidak boleh lebih dari 255 karakter." }),
    role: z
      .enum(UserRole, { message: "Role user harap pilih Admin atau Kasir." })
      .default(UserRole.KASIR),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z
      .string({ message: "Nama harus berupa teks." })
      .trim()
      .min(5, { message: "Nama minimal harus berisi 5 karakter." })
      .max(255, { message: "Nama tidak boleh lebih dari 255 karakter" })
      .regex(/^\D*$/, { message: "Nama tidak boleh mengandung angka." })
      .optional(),
    username: z
      .string({ message: "Username harus berupa teks." })
      .trim()
      .min(5, { message: "Username  minimal harus berisi 5 karakter." })
      .max(50, { message: "Username tidak boleh lebih dari 50 karakter." })
      .optional(),
  });

  static readonly UPDATE_PASSWORD: ZodType = z
    .object({
      oldPassword: z
        .string({ message: "Password harus berupa teks." })
        .min(8, { message: "Password minimal harus berisi 8 karakter." })
        .max(255, { message: "Password tidak boleh lebih dari 255 karakter." }),
      newPassword: z
        .string({ message: "Password baru harus berupa teks." })
        .min(8, { message: "Password baru minimal harus berisi 8 karakter." })
        .max(255, {
          message: "Password baru tidak boleh lebih dari 255 karakter.",
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Password baru dan konfirmasi password tidak cocok",
      path: ["confirm_password"],
    });
}
