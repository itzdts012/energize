"use client"

import { useState } from "react"
import { Button } from "@/components/animate-ui/components/buttons/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/animate-ui/components/radix/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Info, ChevronDown, ChevronUp } from "lucide-react"
import type { Task } from "./types"
import { TaskHistoryTimeline } from "./task-history-timeline"
import { PriorityBadge } from "./priority-slider"
import { Separator } from "@/components/ui/separator"

interface TaskDetailDialogProps {
  task: Task
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void
}

export function TaskDetailDialog({ task, onUpdateTask }: TaskDetailDialogProps) {
  const [open, setOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  const handleSubtaskToggle = (subtaskId: string) => {
    if (!onUpdateTask || !task.subtasks) return

    const updatedSubtasks = task.subtasks.map((subtask) =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    )

    const subtask = task.subtasks.find((s) => s.id === subtaskId)
    const newHistoryEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      type: "subtask_completed" as const,
      description: subtask
        ? `${subtask.completed ? "Unchecked" : "Checked"} subtask: ${subtask.title}`
        : "Updated subtask",
    }

    onUpdateTask(task.id, {
      subtasks: updatedSubtasks,
      history: [...(task.history || []), newHistoryEntry],
    })
  }

  const completedSubtasks = task.subtasks?.filter((s) => s.completed).length ?? 0
  const totalSubtasks = task.subtasks?.length ?? 0
  const progressPercentage =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0

  const historyCount = task.history?.length ?? 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
          <Info className="h-3 w-3 mr-1" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>
            View task details, subtasks, and history
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Status</h4>
              <Badge
                variant={
                  task.status === "done"
                    ? "default"
                    : task.status === "in-progress"
                    ? "secondary"
                    : "outline"
                }
              >
                {task.status === "in-progress"
                  ? "In Progress"
                  : task.status === "done"
                  ? "Done"
                  : task.status === "hold"
                  ? "Hold"
                  : "To Do"}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Priority</h4>
              <PriorityBadge priority={task.priority} />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Due Date</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            {task.assignee && (
              <div>
                <h4 className="text-sm font-medium mb-2">Assignee</h4>
                <p className="text-sm text-muted-foreground">{task.assignee}</p>
              </div>
            )}
          </div>

          {/* Additional Fields */}
          {(task.project || task.estimatedMinutes || task.energyLevel) && (
            <div className="grid grid-cols-2 gap-4">
              {task.project && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Project</h4>
                  <p className="text-sm text-muted-foreground">{task.project}</p>
                </div>
              )}
              {task.estimatedMinutes && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Estimated Duration</h4>
                  <p className="text-sm text-muted-foreground">
                    {task.estimatedMinutes} minutes
                  </p>
                </div>
              )}
              {task.energyLevel !== undefined && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Energy Required</h4>
                  <p className="text-sm text-muted-foreground">
                    {task.energyLevel}%
                  </p>
                </div>
              )}
            </div>
          )}

          {task.description && (
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>
          )}

          {task.tags && task.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Dependencies */}
          {task.dependencies && task.dependencies.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Blocked By</h4>
              <p className="text-xs text-muted-foreground">
                This task depends on {task.dependencies.length}{" "}
                {task.dependencies.length === 1 ? "task" : "tasks"}
              </p>
            </div>
          )}

          {/* Attachments */}
          {task.attachments && task.attachments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Attachments</h4>
              <div className="space-y-2">
                {task.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    {attachment.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Subtasks */}
          {task.subtasks && task.subtasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">Subtasks</h4>
                <span className="text-xs text-muted-foreground">
                  {completedSubtasks}/{totalSubtasks} completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Subtask List */}
              <div className="space-y-2">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center gap-2 rounded-md border p-3 hover:bg-accent transition-colors"
                  >
                    <Checkbox
                      checked={subtask.completed}
                      onCheckedChange={() => handleSubtaskToggle(subtask.id)}
                    />
                    <span
                      className={
                        subtask.completed
                          ? "flex-1 text-sm line-through text-muted-foreground"
                          : "flex-1 text-sm"
                      }
                    >
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Collapsible History Timeline */}
          <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full group">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Activity History</h4>
                <span className="text-xs text-muted-foreground">
                  ({historyCount} {historyCount === 1 ? "event" : "events"})
                </span>
              </div>
              {historyOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <TaskHistoryTimeline history={task.history || []} />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </DialogContent>
    </Dialog>
  )
}
