"use client"

import * as React from "react"
import {
  Calendar,
  CheckSquare,
  DollarSign,
  Dumbbell,
  FileText,
  Home,
  LayoutDashboard,
  LifeBuoy,
  MessageSquare,
  Repeat,
  Settings,
  Target,
  TrendingUp,
  User,
  Zap,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Your Name",
    email: "you@energize.app",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
        },
      ],
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: CheckSquare,
      items: [
        {
          title: "All Tasks",
          url: "/tasks",
        },
        {
          title: "Today",
          url: "/tasks/today",
        },
        {
          title: "Upcoming",
          url: "/tasks/upcoming",
        },
        {
          title: "Completed",
          url: "/tasks/completed",
        },
      ],
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
      items: [
        {
          title: "Month View",
          url: "/calendar/month",
        },
        {
          title: "Week View",
          url: "/calendar/week",
        },
        {
          title: "Day View",
          url: "/calendar/day",
        },
        {
          title: "Events",
          url: "/calendar/events",
        },
      ],
    },
    {
      title: "Notes",
      url: "/notes",
      icon: FileText,
      items: [
        {
          title: "All Notes",
          url: "/notes",
        },
        {
          title: "Journal",
          url: "/notes/journal",
        },
        {
          title: "Ideas",
          url: "/notes/ideas",
        },
        {
          title: "Archive",
          url: "/notes/archive",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: MessageSquare,
    },
  ],
  projects: [
    {
      name: "Fitness",
      url: "/fitness",
      icon: Dumbbell,
    },
    {
      name: "Habits",
      url: "/habits",
      icon: Repeat,
    },
    {
      name: "Goals",
      url: "/goals",
      icon: Target,
    },
    {
      name: "Finance",
      url: "/finance",
      icon: DollarSign,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <Zap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Energize</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Life Tracker
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
