"use client"

import { useState } from "react"
import { Button } from "@/components/ui/animate-ui/components/buttons/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/animate-ui/components/radix/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { SubtaskManager } from "./subtask-manager"
import { PrioritySlider } from "./priority-slider"
import { EnergyLevelSlider } from "./energy-level-slider"
import { AttachmentManager } from "./attachment-manager"
import { DependencySelector } from "./dependency-selector"
import type { Task, Subtask, TaskAttachment } from "./types"

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done", "hold"]),
  priority: z.number().min(1).max(5),
  dueDate: z.string().min(1, "Due date is required"),
  tags: z.string().optional(),
  assignee: z.string().optional(),
  estimatedMinutes: z.string().optional(),
  project: z.string().optional(),
  energyLevel: z.number().min(0).max(100),
})

type TaskFormValues = z.infer<typeof taskFormSchema>

interface EditTaskDialogProps {
  task: Task
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  existingTasks?: Task[]
  children: React.ReactNode
}

export function EditTaskDialog({
  task,
  onUpdateTask,
  existingTasks = [],
  children,
}: EditTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks || [])
  const [attachments, setAttachments] = useState<TaskAttachment[]>(
    task.attachments || []
  )
  const [dependencies, setDependencies] = useState<string[]>(
    task.dependencies || []
  )
  const [advancedOpen, setAdvancedOpen] = useState(false)

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      tags: task.tags?.join(", ") || "",
      assignee: task.assignee || "",
      estimatedMinutes: task.estimatedMinutes?.toString() || "",
      project: task.project || "",
      energyLevel: task.energyLevel ?? 50,
    },
  })

  function onSubmit(values: TaskFormValues) {
    const updates: Partial<Task> = {
      title: values.title,
      description: values.description || undefined,
      status: values.status,
      priority: values.priority as 1 | 2 | 3 | 4 | 5,
      dueDate: values.dueDate,
      tags: values.tags
        ? values.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : undefined,
      assignee: values.assignee || undefined,
      subtasks: subtasks.length > 0 ? subtasks : undefined,
      estimatedMinutes: values.estimatedMinutes
        ? parseInt(values.estimatedMinutes)
        : undefined,
      project: values.project || undefined,
      energyLevel: values.energyLevel,
      dependencies: dependencies.length > 0 ? dependencies : undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
    }

    onUpdateTask(task.id, updates)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Update the task details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add more details about this task..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Energize App" {...field} />
                    </FormControl>
                    <FormDescription>Group related tasks</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimatedMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Duration</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Minutes"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>How long will this take?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <PrioritySlider
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="energyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Energy Level Required</FormLabel>
                  <FormControl>
                    <EnergyLevelSlider
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="hold">Hold</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Subtasks</FormLabel>
              <div className="mt-2">
                <SubtaskManager subtasks={subtasks} onChange={setSubtasks} />
              </div>
            </div>

            <div>
              <FormLabel>Dependencies</FormLabel>
              <div className="mt-2">
                <DependencySelector
                  currentTaskId={task.id}
                  availableTasks={existingTasks}
                  selectedDependencies={dependencies}
                  onChange={setDependencies}
                />
              </div>
            </div>

            {/* Collapsible Advanced Options */}
            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex items-center gap-2 p-0 h-auto font-medium"
                >
                  {advancedOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  Advanced Options
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="development, design, urgent" {...field} />
                      </FormControl>
                      <FormDescription>Separate tags with commas</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignee</FormLabel>
                      <FormControl>
                        <Input placeholder="Assign to..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Attachments</FormLabel>
                  <div className="mt-2">
                    <AttachmentManager
                      attachments={attachments}
                      onChange={setAttachments}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  setSubtasks(task.subtasks || [])
                  setAttachments(task.attachments || [])
                  setDependencies(task.dependencies || [])
                  setAdvancedOpen(false)
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Update Task</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
