export type ProjectStatus = "active" | "on-hold" | "completed" | "archived"

export type Project = {
  id: string
  name: string
  description?: string
  status: ProjectStatus
  startDate: string
  dueDate?: string
  progress: number // 0-100
  taskCount: number
  completedTasks: number
  owner?: string
  tags?: string[]
}
