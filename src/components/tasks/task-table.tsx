import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Task } from "./types"
import { TaskTableRow } from "./task-table-row"

interface TaskTableProps {
  tasks: Task[]
  selectedTasks: string[]
  onToggleTask: (taskId: string) => void
  onStatusChange: (taskId: string, status: Task["status"]) => void
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
  onDuplicateTask: (taskId: string) => void
}

export function TaskTable({
  tasks,
  selectedTasks,
  onToggleTask,
  onStatusChange,
  onUpdateTask,
  onDeleteTask,
  onDuplicateTask,
}: TaskTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Status</TableHead>
            <TableHead>Task</TableHead>
            <TableHead className="w-32">Status</TableHead>
            <TableHead className="w-24">Priority</TableHead>
            <TableHead className="w-32">Due Date</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskTableRow
                key={task.id}
                task={task}
                isSelected={selectedTasks.includes(task.id)}
                onToggle={onToggleTask}
                onStatusChange={onStatusChange}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
                onDuplicateTask={onDuplicateTask}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No tasks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
