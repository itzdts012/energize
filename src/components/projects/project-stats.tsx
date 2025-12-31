import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Clock } from "lucide-react"
import type { Project } from "./types"

interface ProjectStatsProps {
  project: Project
}

export function ProjectStats({ project }: ProjectStatsProps) {
  const activeTasks = project.taskCount - project.completedTasks

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <Circle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{project.taskCount}</div>
          <p className="text-xs text-muted-foreground">
            {activeTasks} active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{project.completedTasks}</div>
          <p className="text-xs text-muted-foreground">
            {project.taskCount > 0 
              ? Math.round((project.completedTasks / project.taskCount) * 100)
              : 0}% complete
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Progress</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{project.progress}%</div>
          <Progress value={project.progress} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  )
}
