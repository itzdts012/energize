export type Subtask = {
  id: string
  title: string
  completed: boolean
}

export type TaskHistoryEntry = {
  id: string
  timestamp: string
  type: "created" | "status_changed" | "edited" | "subtask_completed"
  description: string
  oldValue?: string
  newValue?: string
}

export type Task = {
  id: string
  title: string
  status: "todo" | "in-progress" | "done" | "hold"
  priority: "low" | "medium" | "high"
  dueDate: string
  description?: string
  tags?: string[]
  assignee?: string
  subtasks?: Subtask[]
  history?: TaskHistoryEntry[]
  createdAt?: string
}
