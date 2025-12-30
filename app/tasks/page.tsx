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
    createdAt: "2025-12-28T10:00:00Z",
    history: [
      {
        id: "h1",
        timestamp: "2025-12-28T10:00:00Z",
        type: "created",
        description: "Task created",
      },
      {
        id: "h2",
        timestamp: "2025-12-29T14:30:00Z",
        type: "status_changed",
        description: "Status changed",
        oldValue: "To Do",
        newValue: "In Progress",
      },
    ],
  },
  {
    id: "2",
    title: "Morning workout routine",
    status: "todo",
    priority: "medium",
    dueDate: "2025-12-30",
    description: "Complete full body workout",
    tags: ["fitness", "health"],
    createdAt: "2025-12-27T08:00:00Z",
    history: [
      {
        id: "h3",
        timestamp: "2025-12-27T08:00:00Z",
        type: "created",
        description: "Task created",
      },
    ],
  },
  {
    id: "3",
    title: "Review monthly budget",
    status: "done",
    priority: "high",
    dueDate: "2025-12-29",
    description: "Analyze spending patterns",
    tags: ["finance", "planning"],
    createdAt: "2025-12-25T12:00:00Z",
    history: [
      {
        id: "h4",
        timestamp: "2025-12-25T12:00:00Z",
        type: "created",
        description: "Task created",
      },
      {
        id: "h5",
        timestamp: "2025-12-28T16:00:00Z",
        type: "status_changed",
        description: "Status changed",
        oldValue: "To Do",
        newValue: "Done",
      },
    ],
  },
  {
    id: "4",
    title: "Read 30 pages",
    status: "hold",
    priority: "low",
    dueDate: "2025-12-30",
    tags: ["reading"],
    createdAt: "2025-12-26T09:00:00Z",
    history: [
      {
        id: "h6",
        timestamp: "2025-12-26T09:00:00Z",
        type: "created",
        description: "Task created",
      },
    ],
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
    prev.map((task) => {
      if (task.id === taskId) {
        const statusMap = {
          todo: "To Do",
          "in-progress": "In Progress",
          done: "Done",
          hold: "Hold",
        }

        const newHistoryEntry = {
          id: Math.random().toString(36).substring(7),
          timestamp: new Date().toISOString(),
          type: "status_changed" as const,
          description: "Status changed",
          oldValue: statusMap[task.status],
          newValue: statusMap[status],
        }

        return {
          ...task,
          status,
          history: [...(task.history || []), newHistoryEntry],
        }
      }
      return task
    })
  )
  }


  const handleCreateTask = (newTask: Omit<Task, "id">) => {
  const task: Task = {
    ...newTask,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString(),
    history: [
      {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        type: "created",
        description: "Task created",
      },
    ],
  }
  setTasks((prev) => [task, ...prev])
  }


  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
  setTasks((prev) =>
    prev.map((task) => {
      if (task.id === taskId) {
        // Don't add history entry if it's already included in updates
        if (updates.history) {
          return { ...task, ...updates }
        }

        const newHistoryEntry = {
          id: Math.random().toString(36).substring(7),
          timestamp: new Date().toISOString(),
          type: "edited" as const,
          description: "Task edited",
        }

        return {
          ...task,
          ...updates,
          history: [...(task.history || []), newHistoryEntry],
        }
      }
      return task
    })
  )
  }


  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    setSelectedTasks((prev) => prev.filter((id) => id !== taskId))
  }

  const handleDuplicateTask = (taskId: string) => {
  const taskToDuplicate = tasks.find((task) => task.id === taskId)
  if (!taskToDuplicate) return

  // Extract base title (remove any existing "(Copy X)" suffix)
  const baseTitle = taskToDuplicate.title.replace(/ \(Copy \d+\)$/, "")

  // Find all tasks with the same base title
  const similarTasks = tasks.filter((task) => {
    const taskBaseTitle = task.title.replace(/ \(Copy \d+\)$/, "")
    return taskBaseTitle === baseTitle
  })

  // Calculate next copy number
  const copyNumbers = similarTasks
    .map((task) => {
      const match = task.title.match(/ \(Copy (\d+)\)$/)
      return match ? parseInt(match[1]) : 0
    })
    .filter((num) => num > 0)

  const nextCopyNumber = copyNumbers.length > 0 ? Math.max(...copyNumbers) + 1 : 2

  const duplicatedTask: Task = {
    ...taskToDuplicate,
    id: Math.random().toString(36).substring(7),
    title: `${baseTitle} (Copy ${nextCopyNumber})`,
    status: "todo",
  }

  setTasks((prev) => [duplicatedTask, ...prev])
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
        onDuplicateTask={handleDuplicateTask}
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
