import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

interface TaskTableRowProps {
  task: Task
  isSelected: boolean
  onToggle: (taskId: string) => void
}

export function TaskTableRow({ task, isSelected, onToggle }: TaskTableRowProps) {
  const hasDetails = task.description || task.tags?.length || task.assignee

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggle(task.id)}
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
              : "outline"
          }
        >
          {task.status === "in-progress"
            ? "In Progress"
            : task.status === "done"
            ? "Done"
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
