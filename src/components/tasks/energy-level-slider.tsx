"use client"

import { Slider } from "@/components/ui/slider"
import { Zap } from "lucide-react"

interface EnergyLevelSliderProps {
  value: number
  onChange: (value: number) => void
}

export function EnergyLevelSlider({ value, onChange }: EnergyLevelSliderProps) {
  const getEnergyColor = (level: number) => {
    if (level <= 25) return "text-slate-400"
    if (level <= 50) return "text-blue-400"
    if (level <= 75) return "text-yellow-400"
    return "text-green-400"
  }

  const getEnergyLabel = (level: number) => {
    if (level <= 25) return "Low Energy"
    if (level <= 50) return "Moderate Energy"
    if (level <= 75) return "Good Energy"
    return "High Energy"
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className={`h-4 w-4 ${getEnergyColor(value)}`} />
          <span className="text-sm font-medium">Energy Required: {value}%</span>
        </div>
        <span className="text-xs text-muted-foreground">{getEnergyLabel(value)}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={0}
        max={100}
        step={5}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Minimal</span>
        <span>Moderate</span>
        <span>Maximum</span>
      </div>
    </div>
  )
}
