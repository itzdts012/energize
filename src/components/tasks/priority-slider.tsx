"use client"

import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface PrioritySliderProps {
  value: number
  onChange: (value: number) => void
  showLabel?: boolean
}

const priorityConfig = {
  1: { label: "Low", color: "bg-slate-100 text-slate-700 border-slate-200" },
  2: { label: "Low-Medium", color: "bg-orange-100 text-orange-700 border-orange-200" },
  3: { label: "Medium", color: "bg-amber-200 text-amber-800 border-amber-300" },
  4: { label: "Medium-High", color: "bg-red-200 text-red-800 border-red-300" },
  5: { label: "High", color: "bg-red-500 text-white border-red-600" },
}

export function PrioritySlider({ value, onChange, showLabel = true }: PrioritySliderProps) {
  const config = priorityConfig[value as keyof typeof priorityConfig]

  return (
    <div className="space-y-3">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Priority Level: {value}</span>
          <Badge className={config.color}>{config.label}</Badge>
        </div>
      )}
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={1}
        max={5}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  )
}

export function PriorityBadge({ priority }: { priority: number }) {
  const config = priorityConfig[priority as keyof typeof priorityConfig]
  return <Badge className={config.color}>{config.label}</Badge>
}
