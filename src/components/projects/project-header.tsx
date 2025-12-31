import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/animate-ui/components/buttons/button"
import { Calendar, User, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditProjectDialog } from "./edit-project-dialog"
import { DeleteProjectDialog } from "./delete-project-dialog"
import type { Project } from "./types"

interface ProjectHeaderProps {
  project: Project
  onUpdateProject: (projectId: string, updates: Partial<Project>) => void
  onDeleteProject: (projectId: string) => void
}

export function ProjectHeader({ project, onUpdateProject, onDeleteProject }: ProjectHeaderProps) {
  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "active": return "default"
      case "on-hold": return "secondary"
      case "completed": return "outline"
      case "archived": return "outline"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <Badge variant={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
          {project.description && (
            <p className="mt-2 text-muted-foreground">{project.description}</p>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <EditProjectDialog
              project={project}
              onUpdateProject={onUpdateProject}
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Edit Project
                </DropdownMenuItem>
              }
            />
            <DropdownMenuSeparator />
            <DeleteProjectDialog
              project={project}
              onDeleteProject={onDeleteProject}
            >
              <DropdownMenuItem 
                className="text-destructive"
                onSelect={(e) => e.preventDefault()}
              >
                Delete Project
              </DropdownMenuItem>
            </DeleteProjectDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        {project.owner && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{project.owner}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>
            {new Date(project.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            {project.dueDate && (
              <>
                {" → "}
                {new Date(project.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </>
            )}
          </span>
        </div>
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
