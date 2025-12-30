export type Task = {
  id: string
  title: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  dueDate: string
  description?: string
  tags?: string[]
  assignee?: string
}
