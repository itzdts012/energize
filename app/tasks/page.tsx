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

const initialTasks: Task[] = [
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
    status: "hold",
    priority: "low",
    dueDate: "2025-12-30",
    tags: ["reading"],
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
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

  const handleStatusChange = (taskId: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status } : task))
    )
  }

  const handleCreateTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substring(7),
    }
    setTasks((prev) => [task, ...prev])
  }

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    )
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    setSelectedTasks((prev) => prev.filter((id) => id !== taskId))
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <PageHeader
        title="Tasks"
        description="Manage your daily tasks and projects"
        action={<CreateTaskDialog onCreateTask={handleCreateTask} />}
      />

      <TaskToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <TaskTable
        tasks={paginatedData}
        selectedTasks={selectedTasks}
        onToggleTask={toggleTask}
        onStatusChange={handleStatusChange}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
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
