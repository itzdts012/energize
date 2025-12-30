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

export type TaskAttachment = {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedAt: string
}

export type Task = {
  id: string
  title: string
  status: "todo" | "in-progress" | "done" | "hold"
  priority: 1 | 2 | 3 | 4 | 5  // Changed to 1-5 scale
  dueDate: string
  description?: string
  tags?: string[]
  assignee?: string
  subtasks?: Subtask[]
  history?: TaskHistoryEntry[]
  createdAt?: string
  
  // New fields
  estimatedMinutes?: number
  project?: string
  dependencies?: string[]  // Array of task IDs
  energyLevel?: number  // 0-100
  attachments?: TaskAttachment[]
}
