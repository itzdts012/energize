import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputGroupVariants = cva(
  "flex w-full items-center overflow-hidden rounded-md border bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-colors",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-within:ring-destructive",
        success: "border-green-500 focus-within:ring-green-500",
      },
      inputSize: {
        sm: "h-8 text-xs",
        default: "h-10 text-sm",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

const addonVariants = cva(
  "flex items-center justify-center whitespace-nowrap bg-muted px-3 text-muted-foreground border-input",
  {
    variants: {
      position: {
        left: "border-r",
        right: "border-l",
      },
      inputSize: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      position: "left",
      inputSize: "default",
    },
  }
)

export interface InputGroupProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    VariantProps<typeof inputGroupVariants> {
  label?: string
  error?: string
  helperText?: string
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({
    className,
    variant,
    inputSize,
    label,
    error,
    helperText,
    leftAddon,
    rightAddon,
    leftIcon,
    rightIcon,
    disabled,
    ...props
  }, ref) => {
    // Determine if we should show error variant
    const effectiveVariant = error ? "error" : variant

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}

        <div className={cn(inputGroupVariants({ variant: effectiveVariant, inputSize, className }))}>
          {/* Left Addon (Text) */}
          {leftAddon && (
            <div className={cn(addonVariants({ position: "left", inputSize }))}>
              {leftAddon}
            </div>
          )}

          {/* Left Icon */}
          {leftIcon && !leftAddon && (
            <div className="pl-3 text-muted-foreground flex items-center">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            className={cn(
              "flex-1 bg-transparent px-3 py-2 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              !leftAddon && !leftIcon && "pl-3",
              !rightAddon && !rightIcon && "pr-3"
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && !rightAddon && (
            <div className="pr-3 text-muted-foreground flex items-center">
              {rightIcon}
            </div>
          )}

          {/* Right Addon (Text) */}
          {rightAddon && (
            <div className={cn(addonVariants({ position: "right", inputSize }))}>
              {rightAddon}
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
InputGroup.displayName = "InputGroup"

export { InputGroup, inputGroupVariants }
