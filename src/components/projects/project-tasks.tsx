"use client"

import { useState } from "react"
import { Button } from "@/components/animate-ui/components/buttons/button"
import { Plus } from "lucide-react"
import { TaskTable } from "@/components/tasks/task-table"
import { TaskToolbar } from "@/components/tasks/task-toolbar"
import type { Task } from "@/components/tasks/types"

interface ProjectTasksProps {
  projectId: string
  tasks: Task[]
}

export function ProjectTasks({ projectId, tasks }: ProjectTasksProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [allTasks, setAllTasks] = useState<Task[]>(tasks)

  const filteredTasks = allTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleTask = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    )
  }

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setAllTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setAllTasks((prev) =>
      prev.map((task) => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    )
  }

  const handleDeleteTask = (taskId: string) => {
    setAllTasks((prev) => prev.filter((task) => task.id !== taskId))
    setSelectedTasks((prev) => prev.filter((id) => id !== taskId))
  }

  const handleDuplicateTask = (taskId: string) => {
    const task = allTasks.find((t) => t.id === taskId)
    if (!task) return
    
    const newTask: Task = {
      ...task,
      id: `${task.id}-copy-${Date.now()}`,
      title: `${task.title} (Copy)`,
    }
    setAllTasks((prev) => [...prev, newTask])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <TaskToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <TaskTable
        tasks={filteredTasks}
        selectedTasks={selectedTasks}
        onToggleTask={toggleTask}
        onStatusChange={handleStatusChange}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onDuplicateTask={handleDuplicateTask}
        allTasks={allTasks}
      />

      <div className="text-sm text-muted-foreground">
        {selectedTasks.length > 0
          ? `${selectedTasks.length} of ${filteredTasks.length} tasks selected`
          : `${filteredTasks.length} total tasks`}
      </div>
    </div>
  )
}
