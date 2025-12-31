import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/animate-ui/components/buttons/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import type { Task } from "./types"
import { TaskDetailDialog } from "./task-detail-dialog"
import { TaskStatusButtons } from "./task-status-buttons"
import { EditTaskDialog } from "./edit-task-dialog"
import { DeleteTaskDialog } from "./delete-task-dialog"
import { PriorityBadge } from "./priority-slider"

interface TaskTableRowProps {
  task: Task
  isSelected: boolean
  onToggle: (taskId: string) => void
  onStatusChange: (taskId: string, status: Task["status"]) => void
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
  onDuplicateTask: (taskId: string) => void
  existingTasks: Task[]
}

export function TaskTableRow({
  task,
  isSelected,
  onToggle,
  onStatusChange,
  onUpdateTask,
  onDeleteTask,
  onDuplicateTask,
  existingTasks,
}: TaskTableRowProps) {
  const hasDetails = task.description || task.tags?.length || task.assignee
  const hasSubtasks = task.subtasks && task.subtasks.length > 0
  const completedSubtasks = task.subtasks?.filter((s) => s.completed).length ?? 0

  return (
    <TableRow>
      <TableCell>
        <TaskStatusButtons
          status={task.status}
          onStatusChange={(status) => onStatusChange(task.id, status)}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
            <span className="font-medium">{task.title}</span>
            {hasSubtasks && (
            <span className="text-xs px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground">
                {completedSubtasks}/{task.subtasks?.length}
            </span>
            )}
            <TaskDetailDialog task={task} onUpdateTask={onUpdateTask} />
        </div>
      </TableCell>

      <TableCell>
        <Badge
          variant={
            task.status === "done"
              ? "default"
              : task.status === "in-progress"
              ? "secondary"
              : task.status === "hold"
              ? "outline"
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
      </TableCell>
      <TableCell>
        <PriorityBadge priority={task.priority} />
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {new Date(task.dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <EditTaskDialog task={task} onUpdateTask={onUpdateTask} existingTasks={existingTasks}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Edit
              </DropdownMenuItem>
            </EditTaskDialog>
            <DropdownMenuItem onClick={() => onDuplicateTask(task.id)}>
              Duplicate
            </DropdownMenuItem>
            <DeleteTaskDialog task={task} onDeleteTask={onDeleteTask}>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DeleteTaskDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
