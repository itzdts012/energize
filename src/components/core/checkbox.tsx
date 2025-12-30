import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Check, Minus } from "lucide-react"

const checkboxWrapperVariants = cva(
  "h-4 w-4 shrink-0 rounded-sm border bg-background ring-offset-background transition-all cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-input hover:border-primary",
        error: "border-destructive",
        success: "border-green-500",
      },
      checkboxSize: {
        sm: "h-3.5 w-3.5",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      checkboxSize: "default",
    },
  }
)

// Separate function to get checked styles
const getCheckedStyles = (variant: "default" | "error" | "success" | null | undefined, isChecked: boolean) => {
  if (!isChecked) return ""

  switch (variant) {
    case "error":
      return "bg-destructive border-destructive text-destructive-foreground"
    case "success":
      return "bg-green-500 border-green-500 text-white"
    default:
      return "bg-primary border-primary text-primary-foreground"
  }
}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxWrapperVariants> {
  label?: string
  description?: string
  error?: string
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className,
    variant,
    checkboxSize,
    label,
    description,
    error,
    indeterminate = false,
    checked,
    disabled,
    onCheckedChange,
    onChange,
    id,
    ...props
  }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const generatedId = React.useId()
    const checkboxId = id || generatedId

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current!)

    // Handle indeterminate state
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    const handleWrapperClick = () => {
      if (!disabled && inputRef.current) {
        inputRef.current.click()
      }
    }

    const effectiveVariant = error ? "error" : variant
    const isChecked = checked || false

    return (
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <div className="relative flex items-center pt-0.5">
            {/* Hidden native checkbox */}
            <input
              type="checkbox"
              id={checkboxId}
              ref={inputRef}
              checked={checked}
              disabled={disabled}
              onChange={handleChange}
              className="absolute opacity-0 w-0 h-0"
              {...props}
            />

            {/* Custom checkbox visual */}
            <div
              onClick={handleWrapperClick}
              className={cn(
                checkboxWrapperVariants({ 
                  variant: effectiveVariant, 
                  checkboxSize,
                }),
                getCheckedStyles(effectiveVariant, isChecked),
                "flex items-center justify-center",
                disabled && "cursor-not-allowed opacity-50",
                !disabled && "hover:ring-2 hover:ring-ring hover:ring-offset-2",
                className
              )}
            >
              {isChecked && !indeterminate && (
                <Check className={cn(
                  "text-current",
                  checkboxSize === "sm" && "h-2.5 w-2.5",
                  checkboxSize === "default" && "h-3 w-3",
                  checkboxSize === "lg" && "h-3.5 w-3.5"
                )} />
              )}
              {indeterminate && (
                <Minus className={cn(
                  "text-current",
                  checkboxSize === "sm" && "h-2.5 w-2.5",
                  checkboxSize === "default" && "h-3 w-3",
                  checkboxSize === "lg" && "h-3.5 w-3.5"
                )} />
              )}
            </div>
          </div>

          {(label || description) && (
            <div className="flex-1 space-y-1">
              {label && (
                <label 
                  htmlFor={checkboxId}
                  className={cn(
                    "text-sm font-medium leading-none cursor-pointer select-none block",
                    disabled && "cursor-not-allowed opacity-70"
                  )}
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-sm text-muted-foreground leading-snug">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive pl-7">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

// Checkbox Group Component
export interface CheckboxGroupProps {
  label?: string
  description?: string
  error?: string
  children: React.ReactNode
  className?: string
}

const CheckboxGroup = ({
  label,
  description,
  error,
  children,
  className,
}: CheckboxGroupProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      {(label || description) && (
        <div className="space-y-1">
          {label && (
            <label className="text-sm font-medium leading-none">
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        {children}
      </div>

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
CheckboxGroup.displayName = "CheckboxGroup"

export { Checkbox, CheckboxGroup, checkboxWrapperVariants }