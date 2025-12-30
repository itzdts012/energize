"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, X, Search } from "lucide-react"

const selectVariants = cva(
  "flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus:ring-destructive",
        success: "border-green-500 focus:ring-green-500",
      },
      selectSize: {
        sm: "h-8 text-xs",
        default: "h-10",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      selectSize: "default",
    },
  }
)

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends VariantProps<typeof selectVariants> {
  options: SelectOption[]
  value?: string | string[]
  defaultValue?: string | string[]
  placeholder?: string
  label?: string
  error?: string
  helperText?: string
  disabled?: boolean
  searchable?: boolean
  multiple?: boolean
  clearable?: boolean
  onChange?: (value: string | string[]) => void
  className?: string
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({
    options,
    value: controlledValue,
    defaultValue,
    placeholder = "Select...",
    label,
    error,
    helperText,
    disabled = false,
    searchable = false,
    multiple = false,
    clearable = false,
    onChange,
    variant,
    selectSize,
    className,
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      defaultValue || (multiple ? [] : "")
    )
    const [searchQuery, setSearchQuery] = React.useState("")
    const containerRef = React.useRef<HTMLDivElement>(null)
    const searchInputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => containerRef.current!)

    // Use controlled value if provided
    const currentValue = controlledValue !== undefined ? controlledValue : internalValue

    // Filter options based on search
    const filteredOptions = searchable && searchQuery
      ? options.filter(option =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options

    // Get display label
    const getDisplayLabel = () => {
      if (multiple && Array.isArray(currentValue)) {
        if (currentValue.length === 0) return placeholder
        if (currentValue.length === 1) {
          const option = options.find(opt => opt.value === currentValue[0])
          return option?.label || placeholder
        }
        return `${currentValue.length} selected`
      }
      const option = options.find(opt => opt.value === currentValue)
      return option?.label || placeholder
    }

    // Handle option select
    const handleSelect = (optionValue: string) => {
      let newValue: string | string[]

      if (multiple && Array.isArray(currentValue)) {
        if (currentValue.includes(optionValue)) {
          newValue = currentValue.filter(v => v !== optionValue)
        } else {
          newValue = [...currentValue, optionValue]
        }
      } else {
        newValue = optionValue
        setIsOpen(false)
      }

      setInternalValue(newValue)
      onChange?.(newValue)
      setSearchQuery("")
    }

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      const newValue = multiple ? [] : ""
      setInternalValue(newValue)
      onChange?.(newValue)
    }

    // Check if option is selected
    const isSelected = (optionValue: string) => {
      if (multiple && Array.isArray(currentValue)) {
        return currentValue.includes(optionValue)
      }
      return currentValue === optionValue
    }

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setSearchQuery("")
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Focus search input when dropdown opens
    React.useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, [isOpen, searchable])

    const effectiveVariant = error ? "error" : variant
    const hasValue = multiple ? (Array.isArray(currentValue) && currentValue.length > 0) : currentValue

    return (
      <div className="w-full space-y-2" ref={containerRef}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}

        <div className="relative">
          <div
            className={cn(selectVariants({ variant: effectiveVariant, selectSize, className }))}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            <span className={cn(
              "flex-1 truncate",
              !hasValue && "text-muted-foreground"
            )}>
              {getDisplayLabel()}
            </span>
            <div className="flex items-center gap-1">
              {clearable && hasValue && !disabled && (
                <X
                  className="h-4 w-4 text-muted-foreground hover:text-foreground"
                  onClick={handleClear}
                />
              )}
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </div>
          </div>

          {isOpen && (
            <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
              {searchable && (
                <div className="p-2 border-b">
                  <div className="flex items-center gap-2 px-2 py-1.5 border rounded-md">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}

              <div className="max-h-[300px] overflow-auto p-1">
                {filteredOptions.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    No results found
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        "relative flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-pointer transition-colors",
                        option.disabled
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-accent hover:text-accent-foreground",
                        isSelected(option.value) && "bg-accent"
                      )}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                    >
                      {multiple && (
                        <div className={cn(
                          "h-4 w-4 border rounded-sm flex items-center justify-center",
                          isSelected(option.value) && "bg-primary border-primary"
                        )}>
                          {isSelected(option.value) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                      )}
                      <span className="flex-1">{option.label}</span>
                      {!multiple && isSelected(option.value) && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p className={cn(
            "text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select, selectVariants }