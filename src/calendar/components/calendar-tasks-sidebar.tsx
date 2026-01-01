"use client";

import { useMemo, useState } from "react";
import { format, isSameDay } from "date-fns";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Pause, 
  Plus, 
  Sparkles,
  ChevronRight,
  CalendarCheck
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCalendar } from "@/calendar/contexts/calendar-context";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done" | "hold";
  priority: "low" | "medium" | "high";
  dueDate: string;
  description?: string;
}

const mockTasks: Task[] = [
  { id: "1", title: "Review calendar events", status: "todo", priority: "high", dueDate: "2025-12-02", description: "Go through all scheduled events" },
  { id: "2", title: "Update dashboard", status: "in-progress", priority: "medium", dueDate: "2025-12-02" },
  { id: "3", title: "Morning workout", status: "done", priority: "low", dueDate: "2025-12-02" },
  { id: "4", title: "Team meeting prep", status: "todo", priority: "high", dueDate: "2025-12-03" },
  { id: "5", title: "Code review", status: "in-progress", priority: "medium", dueDate: "2025-12-03" },
  { id: "6", title: "Write documentation", status: "hold", priority: "low", dueDate: "2025-12-03" },
];

export function CalendarTasksSidebar() {
  const { selectedDate } = useCalendar();
  const [tasks, setTasks] = useState(mockTasks);

  const todayTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return isSameDay(taskDate, selectedDate);
    });
  }, [tasks, selectedDate]);

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleAutoSchedule = () => {
    alert("Auto-schedule feature coming soon!");
  };

  return (
    <div className="flex h-screen w-80 flex-col border-l bg-background">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5" />
          <h2 className="font-semibold">Tasks</h2>
        </div>
        <Button asChild variant="ghost" size="icon">
          <Link href="/tasks">
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Date & Actions */}
      <div className="space-y-3 border-b p-4">
        <p className="text-sm text-muted-foreground">
          {format(selectedDate, "EEEE, MMMM d, yyyy")}
        </p>

        {/* Create Task Button */}
        <Button className="w-full" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>

        {/* Auto Schedule Button */}
        <Button 
          className="w-full" 
          variant="outline" 
          size="sm"
          onClick={handleAutoSchedule}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Auto Schedule
        </Button>
      </div>

      {/* Task List */}
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {todayTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Circle className="mb-3 h-12 w-12 text-muted-foreground/20" />
              <p className="text-sm font-medium text-muted-foreground">
                No tasks for this day
              </p>
              <p className="text-xs text-muted-foreground/70">
                Create a new task to get started
              </p>
            </div>
          ) : (
            todayTasks.map((task) => (
              <div
                key={task.id}
                className="group rounded-lg border bg-card transition-colors hover:bg-accent"
              >
                {/* Status Buttons */}
                <div className="flex gap-1 border-b p-2">
                  <Button
                    variant={task.status === "todo" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 flex-1 text-xs"
                    onClick={() => handleStatusChange(task.id, "todo")}
                  >
                    <Circle className="mr-1 h-3 w-3" />
                    Todo
                  </Button>
                  <Button
                    variant={task.status === "in-progress" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 flex-1 text-xs"
                    onClick={() => handleStatusChange(task.id, "in-progress")}
                  >
                    <Clock className="mr-1 h-3 w-3 text-yellow-600" />
                    Progress
                  </Button>
                  <Button
                    variant={task.status === "hold" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 flex-1 text-xs"
                    onClick={() => handleStatusChange(task.id, "hold")}
                  >
                    <Pause className="mr-1 h-3 w-3 text-blue-600" />
                    Hold
                  </Button>
                  <Button
                    variant={task.status === "done" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 flex-1 text-xs"
                    onClick={() => handleStatusChange(task.id, "done")}
                  >
                    <CheckCircle2 className="mr-1 h-3 w-3 text-green-600" />
                    Done
                  </Button>
                </div>

                {/* Task Content */}
                <div className="space-y-2 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm font-medium leading-tight ${
                        task.status === "done"
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>

                  {task.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        task.priority === "high"
                          ? "destructive"
                          : task.priority === "medium"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{todayTasks.length} tasks</span>
          <span>
            {todayTasks.filter((t) => t.status === "done").length} completed
          </span>
        </div>
      </div>
    </div>
  );
}
