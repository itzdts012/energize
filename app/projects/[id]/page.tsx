"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { ProjectHeader } from "@/components/projects/project-header"
import { ProjectCharts } from "@/components/projects/project-charts"
import { ProjectTasks } from "@/components/projects/project-tasks"
import type { Project } from "@/components/projects/types"
import type { Task } from "@/components/tasks/types"

// Mock data - in real app this would come from API/database
const initialProjects: Project[] = [
  {
    id: "1",
    name: "Energize App",
    description: "Complete life tracker application with dashboard, tasks, and analytics",
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

// Mock tasks for projects
const mockProjectTasks: Record<string, Task[]> = {
  "1": [
    {
      id: "1",
      title: "Design dashboard layout",
      status: "done",
      priority: 5,
      dueDate: "2025-12-28",
      description: "Create wireframes and mockups for dashboard",
      tags: ["design", "ui"],
      assignee: "You"
    },
    {
      id: "2",
      title: "Implement task management",
      status: "in-progress",
      priority: 5,
      dueDate: "2025-12-31",
      description: "Build task CRUD operations",
      tags: ["development"],
      assignee: "You"
    },
    {
      id: "3",
      title: "Add analytics graphs",
      status: "todo",
      priority: 3,
      dueDate: "2026-01-15",
      tags: ["development", "analytics"]
    }
  ],
  "2": [
    {
      id: "4",
      title: "Morning workout routine",
      status: "done",
      priority: 5,
      dueDate: "2025-12-30",
      description: "Complete 30-min full body workout"
    },
    {
      id: "5",
      title: "Track daily calories",
      status: "in-progress",
      priority: 3,
      dueDate: "2025-12-31"
    }
  ],
  "3": [
    {
      id: "6",
      title: "Complete Duolingo lessons",
      status: "todo",
      priority: 3,
      dueDate: "2026-01-05"
    }
  ]
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [project, setProject] = useState<Project | undefined>(
    initialProjects.find((p) => p.id === id)
  )
  const tasks = mockProjectTasks[id] || []

  const handleUpdateProject = (projectId: string, updates: Partial<Project>) => {
    setProject((prev) => {
      if (!prev) return prev
      return { ...prev, ...updates }
    })
  }

  const handleDeleteProject = (projectId: string) => {
    router.push("/projects")
  }

  if (!project) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link href="/projects">
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <Link href="/projects">
        <Button variant="ghost" size="sm">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </Link>

      <ProjectHeader 
        project={project} 
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
      />

      {/* Replace ProjectStats with ProjectCharts */}
      <ProjectCharts project={project} tasks={tasks} />

      <ProjectTasks projectId={id} tasks={tasks} />
    </div>
  )
}