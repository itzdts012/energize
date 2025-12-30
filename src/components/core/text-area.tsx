import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
      },
      textareaSize: {
        sm: "min-h-[60px] text-xs",
        default: "min-h-[100px]",
        lg: "min-h-[150px] text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "default",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string
  error?: string
  helperText?: string
  showCount?: boolean
  maxLength?: number
  autoResize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    variant,
    textareaSize,
    label,
    error,
    helperText,
    showCount = false,
    maxLength,
    autoResize = false,
    disabled,
    value,
    onChange,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || "")
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    // Combine refs
    React.useImperativeHandle(ref, () => textareaRef.current!)

    // Auto-resize functionality
    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
      }
    }, [internalValue, autoResize])

    // Handle value changes
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value)
      onChange?.(e)
    }

    // Use controlled value if provided
    const currentValue = value !== undefined ? value : internalValue
    const characterCount = String(currentValue).length

    // Determine if we should show error variant
    const effectiveVariant = error ? "error" : variant

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}

        <textarea
          className={cn(
            textareaVariants({ variant: effectiveVariant, textareaSize, className }),
            autoResize && "overflow-hidden"
          )}
          ref={textareaRef}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />

        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            {(error || helperText) && (
              <p className={cn(
                "text-sm",
                error ? "text-destructive" : "text-muted-foreground"
              )}>
                {error || helperText}
              </p>
            )}
          </div>

          {showCount && (
            <p className={cn(
              "text-sm text-muted-foreground tabular-nums",
              maxLength && characterCount > maxLength * 0.9 && "text-orange-500",
              maxLength && characterCount === maxLength && "text-destructive"
            )}>
              {characterCount}{maxLength && ` / ${maxLength}`}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
