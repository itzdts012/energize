import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonGroupVariants = cva(
  "inline-flex",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      attached: {
        true: "",
        false: "gap-2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      attached: true,
    },
  }
)

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  children: React.ReactNode
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, attached, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const count = childArray.length

    return (
      <div
        ref={ref}
        role="group"
        className={cn(buttonGroupVariants({ orientation, attached, className }))}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child

          // Don't modify if not attached
          if (!attached) return child

          // Determine position
          const isFirst = index === 0
          const isLast = index === count - 1
          const isMiddle = !isFirst && !isLast
          const isHorizontal = orientation === "horizontal"

          // Build className for attached buttons
          let attachedClassName = ""

          if (isHorizontal) {
            if (isFirst) {
              attachedClassName = "rounded-r-none"
            } else if (isLast) {
              attachedClassName = "rounded-l-none -ml-px"
            } else if (isMiddle) {
              attachedClassName = "rounded-none -ml-px"
            }
          } else {
            // Vertical orientation
            if (isFirst) {
              attachedClassName = "rounded-b-none"
            } else if (isLast) {
              attachedClassName = "rounded-t-none -mt-px"
            } else if (isMiddle) {
              attachedClassName = "rounded-none -mt-px"
            }
          }

          // Clone child with additional className - Fixed TypeScript
          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn((child.props as any).className, attachedClassName),
          })
        })}
      </div>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup, buttonGroupVariants }