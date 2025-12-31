"use client"

import { useState } from "react"
import { Button } from "@/components/animate-ui/components/buttons/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus } from "lucide-react"
import type { Subtask } from "./types"

interface SubtaskManagerProps {
  subtasks: Subtask[]
  onChange: (subtasks: Subtask[]) => void
}

export function SubtaskManager({ subtasks, onChange }: SubtaskManagerProps) {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("")

  const addSubtask = () => {
    if (!newSubtaskTitle.trim()) return

    const newSubtask: Subtask = {
      id: Math.random().toString(36).substring(7),
      title: newSubtaskTitle,
      completed: false,
    }

    onChange([...subtasks, newSubtask])
    setNewSubtaskTitle("")
  }

  const toggleSubtask = (subtaskId: string) => {
    onChange(
      subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    )
  }

  const deleteSubtask = (subtaskId: string) => {
    onChange(subtasks.filter((subtask) => subtask.id !== subtaskId))
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          placeholder="Add a subtask..."
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addSubtask()
            }
          }}
        />
        <Button type="button" onClick={addSubtask} size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {subtasks.length > 0 && (
        <div className="space-y-2">
          {subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className="flex items-center gap-2 rounded-md border p-2"
            >
              <Checkbox
                checked={subtask.completed}
                onCheckedChange={() => toggleSubtask(subtask.id)}
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
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => deleteSubtask(subtask.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
