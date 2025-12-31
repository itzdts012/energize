"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/animate-ui/components/buttons/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, X } from "lucide-react"
import type { Task } from "./types"

interface DependencySelectorProps {
  currentTaskId?: string
  availableTasks: Task[]
  selectedDependencies: string[]
  onChange: (dependencies: string[]) => void
}

export function DependencySelector({
  currentTaskId,
  availableTasks,
  selectedDependencies,
  onChange,
}: DependencySelectorProps) {
  const toggleDependency = (taskId: string) => {
    if (selectedDependencies.includes(taskId)) {
      onChange(selectedDependencies.filter((id) => id !== taskId))
    } else {
      onChange([...selectedDependencies, taskId])
    }
  }

  const removeDependency = (taskId: string) => {
    onChange(selectedDependencies.filter((id) => id !== taskId))
  }

  const selectedTasks = availableTasks.filter((task) =>
    selectedDependencies.includes(task.id)
  )

  const selectableTasks = availableTasks.filter(
    (task) => task.id !== currentTaskId
  )

  return (
    <div className="space-y-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" size="sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            Add Dependency
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Blocked by:</h4>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {selectableTasks.length > 0 ? (
                selectableTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedDependencies.includes(task.id)}
                      onCheckedChange={() => toggleDependency(task.id)}
                    />
                    <span className="text-sm">{task.title}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No tasks available</p>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {selectedTasks.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            This task is blocked by:
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedTasks.map((task) => (
              <Badge key={task.id} variant="outline" className="pr-1">
                {task.title}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => removeDependency(task.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
