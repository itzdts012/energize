import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

interface TaskTableRowProps {
  task: Task
  isSelected: boolean
  onToggle: (taskId: string) => void
  onStatusChange: (taskId: string, status: Task["status"]) => void
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
}

export function TaskTableRow({
  task,
  isSelected,
  onToggle,
  onStatusChange,
  onUpdateTask,
  onDeleteTask,
}: TaskTableRowProps) {
  const hasDetails = task.description || task.tags?.length || task.assignee

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
          {hasDetails && <TaskDetailDialog task={task} />}
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
        <Badge
          variant={
            task.priority === "high"
              ? "destructive"
              : task.priority === "medium"
              ? "secondary"
              : "outline"
          }
        >
          {task.priority}
        </Badge>
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
            <EditTaskDialog task={task} onUpdateTask={onUpdateTask}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Edit
              </DropdownMenuItem>
            </EditTaskDialog>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
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
