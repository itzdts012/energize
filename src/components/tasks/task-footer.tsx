import type { Task } from "./types"

interface TaskFooterProps {
  tasks: Task[]
  selectedCount: number
  filteredCount: number
}

export function TaskFooter({ tasks, selectedCount, filteredCount }: TaskFooterProps) {
  const completedCount = tasks.filter((t) => t.status === "done").length

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <div>
        {selectedCount > 0
          ? `${selectedCount} of ${filteredCount} task(s) selected`
          : `${filteredCount} total task(s)`}
      </div>
      <div>{completedCount} completed</div>
    </div>
  )
}
