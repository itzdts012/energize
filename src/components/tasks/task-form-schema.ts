import { z } from "zod"

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done", "hold"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().min(1, "Due date is required"),
  tags: z.string().optional(),
  assignee: z.string().optional(),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>
