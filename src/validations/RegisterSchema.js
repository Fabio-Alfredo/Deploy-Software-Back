import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre no puede estar vacío" })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres" }),
  email: z
    .string()
    .email({ message: "Correo electrónico no válido" })
    .min(1, { message: "El correo no puede estar vacío" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(50, { message: "La contraseña no puede exceder los 50 caracteres" }),
});
