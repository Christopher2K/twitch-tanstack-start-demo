import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const todoFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  isCompleted: z.boolean().optional(),
});
export type TodoFormType = z.infer<typeof todoFormSchema>;
export const resolver = zodResolver(todoFormSchema);
