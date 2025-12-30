import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Task } from "./types"

interface TaskDetailDialogProps {
  task: Task
}

export function TaskDetailDialog({ task }: TaskDetailDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
          Details
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>
            Task details and additional information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {task.description && (
            <div>
              <h4 className="mb-1 text-sm font-semibold">Description</h4>
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            </div>
          )}
          {task.assignee && (
            <div>
              <h4 className="mb-1 text-sm font-semibold">Assignee</h4>
              <p className="text-sm text-muted-foreground">{task.assignee}</p>
            </div>
          )}
          {task.tags && task.tags.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
