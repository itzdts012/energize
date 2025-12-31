"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/blocks/page-header"
import { CreateProjectDialog } from "@/components/projects/create-project-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Project } from "@/components/projects/types"

// Mock data
const initialProjects: Project[] = [
  {
    id: "1",
    name: "Energize App",
    description: "Complete life tracker application",
    status: "active",
    startDate: "2025-12-01",
    dueDate: "2026-03-31",
    progress: 45,
    taskCount: 24,
    completedTasks: 11,
    owner: "You",
    tags: ["development", "design"]
  },
  {
    id: "2",
    name: "Fitness Goal Q1",
    description: "Complete fitness transformation program",
    status: "active",
    startDate: "2025-12-15",
    dueDate: "2026-03-15",
    progress: 30,
    taskCount: 12,
    completedTasks: 4,
    tags: ["health", "fitness"]
  },
  {
    id: "3",
    name: "Learn Spanish",
    description: "Achieve conversational fluency",
    status: "on-hold",
    startDate: "2025-11-01",
    progress: 20,
    taskCount: 8,
    completedTasks: 2,
    tags: ["learning", "language"]
  }
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  const handleCreateProject = (newProject: Omit<Project, "id" | "progress" | "taskCount" | "completedTasks">) => {
    const project: Project = {
      ...newProject,
      id: `${Date.now()}`,
      progress: 0,
      taskCount: 0,
      completedTasks: 0,
    }
    setProjects((prev) => [project, ...prev])
  }

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "active": return "default"
      case "on-hold": return "secondary"
      case "completed": return "outline"
      case "archived": return "outline"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <PageHeader
        title="Projects"
        description="Manage your active projects and goals"
        action={<CreateProjectDialog onCreateProject={handleCreateProject} />}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="cursor-pointer transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tasks</span>
                  <span className="font-medium">
                    {project.completedTasks}/{project.taskCount}
                  </span>
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
