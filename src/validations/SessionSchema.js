import { z } from "zod";

export const sessionSchema = z.object({
  tasks: z
    .array(z.object({ _id: z.string(), title: z.string() }))
    .min(1, { message: "Debes seleccionar al menos una tarea" }),
});