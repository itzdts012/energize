"use client"

import { useState } from "react"
import { PageHeader } from "@/components/blocks/page-header"
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog"
import { TaskToolbar } from "@/components/tasks/task-toolbar"
import { TaskTable } from "@/components/tasks/task-table"
import { TaskFooter } from "@/components/tasks/task-footer"
import type { Task } from "@/components/tasks/types"

const tasks: Task[] = [
  {
    id: "1",
    title: "Build Energize dashboard",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-12-31",
    description: "Create comprehensive dashboard with widgets",
    tags: ["development", "design"],
    assignee: "You",
  },
  {
    id: "2",
    title: "Morning workout routine",
    status: "todo",
    priority: "medium",
    dueDate: "2025-12-30",
    description: "Complete full body workout",
    tags: ["fitness", "health"],
  },
  {
    id: "3",
    title: "Review monthly budget",
    status: "done",
    priority: "high",
    dueDate: "2025-12-29",
    description: "Analyze spending patterns",
    tags: ["finance", "planning"],
  },
]

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleTask = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <PageHeader
        title="Tasks"
        description="Manage your daily tasks and projects"
        action={<CreateTaskDialog />}
      />

      <TaskToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <TaskTable
        tasks={filteredTasks}
        selectedTasks={selectedTasks}
        onToggleTask={toggleTask}
      />

      <TaskFooter
        tasks={tasks}
        selectedCount={selectedTasks.length}
        filteredCount={filteredTasks.length}
      />
    </div>
  )
}
