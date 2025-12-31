"use client"

import { Button } from "@/components/ui/animate-ui/components/buttons/button"
import { Check, Clock, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Task } from "./types"

interface TaskStatusButtonsProps {
  status: Task["status"]
  onStatusChange: (status: Task["status"]) => void
}

export function TaskStatusButtons({
  status,
  onStatusChange,
}: TaskStatusButtonsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-7 w-7",
          status === "done" 
            ? "bg-green-500/20 text-green-600 hover:bg-green-500/20" 
            : "hover:bg-green-500/10"
        )}
        onClick={() => onStatusChange("done")}
      >
        <Check className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-7 w-7",
          status === "in-progress" 
            ? "bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/20" 
            : "hover:bg-yellow-500/10"
        )}
        onClick={() => onStatusChange("in-progress")}
      >
        <Clock className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-7 w-7",
          status === "hold" 
            ? "bg-blue-500/20 text-blue-600 hover:bg-blue-500/20" 
            : "hover:bg-blue-500/10"
        )}
        onClick={() => onStatusChange("hold")}
      >
        <Pause className="h-4 w-4" />
      </Button>
    </div>
  )
}
