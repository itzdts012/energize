import { CheckCircle2, Clock, Edit, Plus } from "lucide-react"
import type { TaskHistoryEntry } from "./types"

interface TaskHistoryTimelineProps {
  history: TaskHistoryEntry[]
}

export function TaskHistoryTimeline({ history }: TaskHistoryTimelineProps) {
  const getIcon = (type: TaskHistoryEntry["type"]) => {
    switch (type) {
      case "created":
        return <Plus className="h-4 w-4" />
      case "status_changed":
        return <Clock className="h-4 w-4" />
      case "edited":
        return <Edit className="h-4 w-4" />
      case "subtask_completed":
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  const getColor = (type: TaskHistoryEntry["type"]) => {
    switch (type) {
      case "created":
        return "bg-blue-500"
      case "status_changed":
        return "bg-purple-500"
      case "edited":
        return "bg-yellow-500"
      case "subtask_completed":
        return "bg-green-500"
    }
  }

  if (!history || history.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-4">
        No history available
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {history.map((entry, index) => (
        <div key={entry.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${getColor(
                entry.type
              )} text-white`}
            >
              {getIcon(entry.type)}
            </div>
            {index < history.length - 1 && (
              <div className="w-0.5 flex-1 bg-border my-1 min-h-[20px]" />
            )}
          </div>
          <div className="flex-1 pb-4">
            <p className="text-sm font-medium">{entry.description}</p>
            {(entry.oldValue || entry.newValue) && (
              <p className="text-xs text-muted-foreground mt-1">
                {entry.oldValue && (
                  <span className="line-through">{entry.oldValue}</span>
                )}
                {entry.oldValue && entry.newValue && " → "}
                {entry.newValue && <span>{entry.newValue}</span>}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(entry.timestamp).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
