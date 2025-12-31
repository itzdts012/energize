"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, Label, Pie, PieChart, RadialBar, RadialBarChart, XAxis, YAxis } from "recharts"
import type { Project } from "./types"
import type { Task } from "@/components/tasks/types"

interface ProjectChartsProps {
  project: Project
  tasks: Task[]
}

export function ProjectCharts({ project, tasks }: ProjectChartsProps) {
  // Task Status Distribution Data
  const statusData = [
    {
      status: "To Do",
      count: tasks.filter((t) => t.status === "todo").length,
      fill: "hsl(var(--chart-1))",
    },
    {
      status: "In Progress",
      count: tasks.filter((t) => t.status === "in-progress").length,
      fill: "hsl(var(--chart-2))",
    },
    {
      status: "Done",
      count: tasks.filter((t) => t.status === "done").length,
      fill: "hsl(var(--chart-3))",
    },
    {
      status: "On Hold",
      count: tasks.filter((t) => t.status === "hold").length,
      fill: "hsl(var(--chart-4))",
    },
  ].filter((item) => item.count > 0)

  const statusConfig = {
    count: {
      label: "Tasks",
    },
    "To Do": {
      label: "To Do",
      color: "hsl(var(--chart-1))",
    },
    "In Progress": {
      label: "In Progress",
      color: "hsl(var(--chart-2))",
    },
    Done: {
      label: "Done",
      color: "hsl(var(--chart-3))",
    },
    "On Hold": {
      label: "On Hold",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig

  // Priority Distribution Data
  const priorityData = [
    { priority: "Low (1-2)", count: tasks.filter((t) => t.priority <= 2).length },
    { priority: "Medium (3)", count: tasks.filter((t) => t.priority === 3).length },
    { priority: "High (4-5)", count: tasks.filter((t) => t.priority >= 4).length },
  ].filter((item) => item.count > 0)

  const priorityConfig = {
    count: {
      label: "Tasks",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  // Progress Data (mock - in real app would be historical)
  const progressData = [
    { week: "Week 1", progress: 10 },
    { week: "Week 2", progress: 25 },
    { week: "Week 3", progress: 35 },
    { week: "Week 4", progress: project.progress },
  ]

  const progressConfig = {
    progress: {
      label: "Progress",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  // Completion Rate (Radial)
  const completionData = [
    {
      name: "Completed",
      value: project.progress,
      fill: "hsl(var(--chart-3))",
    },
  ]

  const completionConfig = {
    value: {
      label: "Completion %",
    },
  } satisfies ChartConfig

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Task Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Task Distribution</CardTitle>
          <CardDescription>Tasks by status</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center pb-0">
          <ChartContainer
            config={statusConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={statusData}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {project.taskCount}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Tasks
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Completion Rate */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>Project completion rate</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center pb-0">
          <ChartContainer
            config={completionConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={completionData}
              startAngle={90}
              endAngle={90 - (completionData[0].value / 100) * 360}
              innerRadius={80}
              outerRadius={140}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="name" />}
              />
              <RadialBar dataKey="value" background cornerRadius={10} />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan
                  x="50%"
                  y="50%"
                  className="fill-foreground text-4xl font-bold"
                >
                  {project.progress}%
                </tspan>
                <tspan
                  x="50%"
                  y="50%"
                  dy={30}
                  className="fill-muted-foreground text-sm"
                >
                  Complete
                </tspan>
              </text>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Progress Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Trend</CardTitle>
          <CardDescription>Weekly progress tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={progressConfig}>
            <AreaChart
              data={progressData}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <defs>
                <linearGradient id="fillProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-progress)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-progress)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, 100]}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="progress"
                type="monotone"
                fill="url(#fillProgress)"
                fillOpacity={0.4}
                stroke="var(--color-progress)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Priority Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Distribution</CardTitle>
          <CardDescription>Tasks by priority level</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={priorityConfig}>
            <BarChart
              data={priorityData}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <XAxis
                dataKey="priority"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
