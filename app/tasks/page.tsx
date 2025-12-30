"use client"

import { useState } from "react"
import { PageHeader } from "@/components/blocks/page-header"
import { DataPagination } from "@/components/blocks/data-pagination"
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog"
import { TaskToolbar } from "@/components/tasks/task-toolbar"
import { TaskTable } from "@/components/tasks/task-table"
import { TaskFooter } from "@/components/tasks/task-footer"
import { usePagination } from "@/hooks/use-pagination"
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
  {
    id: "4",
    title: "Read 30 pages",
    status: "todo",
    priority: "low",
    dueDate: "2025-12-30",
    tags: ["reading"],
  },
  {
    id: "5",
    title: "Update portfolio website",
    status: "in-progress",
    priority: "medium",
    dueDate: "2026-01-05",
    description: "Add new projects and refresh design",
    tags: ["development"],
  },
  {
    id: "6",
    title: "Call dentist",
    status: "todo",
    priority: "high",
    dueDate: "2025-12-31",
  },
  {
    id: "7",
    title: "Meal prep for week",
    status: "todo",
    priority: "medium",
    dueDate: "2026-01-01",
    tags: ["health", "cooking"],
  },
  {
    id: "8",
    title: "Review Q4 goals",
    status: "done",
    priority: "high",
    dueDate: "2025-12-28",
    description: "Analyze goal completion rate",
  },
]

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const {
    currentPage,
    pageSize,
    totalPages,
    paginatedData,
    totalItems,
    handlePageChange,
    handlePageSizeChange,
  } = usePagination({
    data: filteredTasks,
    initialPageSize: 10,
  })

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

      <TaskToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <TaskTable
        tasks={paginatedData}
        selectedTasks={selectedTasks}
        onToggleTask={toggleTask}
      />

      <div className="flex flex-col gap-4">
        <TaskFooter
          tasks={tasks}
          selectedCount={selectedTasks.length}
          filteredCount={totalItems}
        />

        <DataPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  )
}
