import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Correo electrónico no válido" })
    .min(1, { message: "El correo no puede estar vacío" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(50, { message: "La contraseña no puede exceder los 50 caracteres" }),
});
