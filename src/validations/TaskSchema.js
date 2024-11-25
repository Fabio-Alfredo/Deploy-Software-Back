import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "El título no puede estar vacío" })
    .max(50, { message: "El título no puede exceder los 50 caracteres" }),
  description: z
    .string()
    .min(1, { message: "La descripción no puede estar vacía" }),
});
