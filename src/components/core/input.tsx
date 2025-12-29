import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, X } from "lucide-react"

const inputVariants = cva(
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
      },
      inputSize: {
        sm: "h-8 text-xs px-2",
        default: "h-10",
        lg: "h-12 text-base px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  showPasswordToggle?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant,
    inputSize,
    type = "text",
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    clearable = false,
    onClear,
    showPasswordToggle = false,
    disabled,
    value,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [inputType, setInputType] = React.useState(type)

    // Handle password toggle
    React.useEffect(() => {
      if (type === "password" && showPasswordToggle) {
        setInputType(showPassword ? "text" : "password")
      }
    }, [showPassword, type, showPasswordToggle])

    // Determine if we should show error variant
    const effectiveVariant = error ? "error" : variant

    const hasValue = value !== undefined && value !== null && value !== ""
    const showClearButton = clearable && hasValue && !disabled

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}

          <input
            type={inputType}
            className={cn(
              inputVariants({ variant: effectiveVariant, inputSize, className }),
              leftIcon && "pl-10",
              (rightIcon || showClearButton || (type === "password" && showPasswordToggle)) && "pr-10"
            )}
            ref={ref}
            disabled={disabled}
            value={value}
            {...props}
          />

          {/* Right side icons/buttons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {showClearButton && onClear && (
              <button
                type="button"
                onClick={onClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {type === "password" && showPasswordToggle && !showClearButton && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}

            {rightIcon && !showClearButton && !(type === "password" && showPasswordToggle) && (
              <div className="text-muted-foreground">{rightIcon}</div>
            )}
          </div>
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
Input.displayName = "Input"

export { Input, inputVariants }