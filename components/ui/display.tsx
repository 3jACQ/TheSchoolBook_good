import * as React from "react"

import { cn } from "@/lib/utils"

import { cva, type VariantProps } from "class-variance-authority"

const screenVariants = cva(
  "m-auto",
  {
    variants: {
      size: {
        default: "max-w-screen-2xl",
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
      },
    }     
  }
)

export interface ScreenProps extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof screenVariants> {
  asChild?: boolean
}


const ScreenCenter = React.forwardRef<HTMLDivElement,ScreenProps>(({ className,size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      screenVariants({ size, className }),
      className
    )}
    {...props}
  />
))

ScreenCenter.displayName = "ScreenCenter"


const CenterPane = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full h-full flex flex-col items-center justify-center",
      className
    )}
    {...props}
  />
))
CenterPane.displayName = "CenterPane"

const HFlex = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
        "flex flex-row items-center",
        className
        )}
        {...props}
    />
    ))
HFlex.displayName = "HFlex"

const VFlex = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
        "flex flex-col items-center",
        className
        )}
        {...props}
    />
    ))
VFlex.displayName = "VFlex"


export {CenterPane, HFlex, VFlex,ScreenCenter};