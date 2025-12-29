import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      },
      size: {
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-14 w-14",
      },
      shape: {
        square: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      shape: "square",
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon?: React.ReactNode
  loading?: boolean
  ariaLabel: string // Required for accessibility
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    shape,
    icon,
    loading = false,
    disabled,
    ariaLabel,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, shape, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          icon
        )}
      </button>
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }