"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react"

interface TaskToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function TaskToolbar({ searchQuery, onSearchChange }: TaskToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>All Tasks</DropdownMenuItem>
          <DropdownMenuItem>To Do</DropdownMenuItem>
          <DropdownMenuItem>In Progress</DropdownMenuItem>
          <DropdownMenuItem>Completed</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Priority
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>All Priorities</DropdownMenuItem>
          <DropdownMenuItem>High</DropdownMenuItem>
          <DropdownMenuItem>Medium</DropdownMenuItem>
          <DropdownMenuItem>Low</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
