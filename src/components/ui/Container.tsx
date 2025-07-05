import { cn } from "@/lib/utils";
import React from "react";
type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("container mx-auto p-4", className)}>{children}</div>
  );
}
