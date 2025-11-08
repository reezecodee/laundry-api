import { z, ZodType } from "zod";

export class AuthValidator {
  static readonly LOGIN: ZodType = z.object({
    username: z
      .string({ message: "Username harus berupa teks." })
      .nonempty({ message: "Username tidak boleh kosong." }),
    password: z
      .string({ message: "Password harus berupa teks." })
      .nonempty({ message: "Password tidak boleh kosong." }),
  });

  static readonly REGISTER: ZodType = z
    .object({
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
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password dan konfirmasi password tidak cocok",
      path: ["confirm_password"],
    });
}
