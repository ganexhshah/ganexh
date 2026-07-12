"use client";

import type * as React from "react";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import * as GroupPrimitive from "react-aria-components/Group";
import * as InputPrimitive from "react-aria-components/Input";

import { cn } from "@/lib/utils";

interface InputGroupProps extends React.ComponentProps<
  typeof GroupPrimitive.Group
> {
  size?: "sm" | "md" | "lg";
}

function InputGroup({ className, size = "md", ...props }: InputGroupProps) {
  return (
    <GroupPrimitive.Group
      data-input-group=""
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/input-group flex w-full min-w-0 cursor-text items-center rounded-md border border-white/15 bg-white/5 text-white backdrop-blur-sm",
          "**:data-input-control:flex-1 **:data-input-control:border-0 **:data-input-control:bg-transparent **:data-input-control:outline-none **:data-input-control:ring-0",
          "has-data-input:has-[[data-input-group-addon]:first-child]:pl-0 has-data-input:has-[[data-input-group-addon]:last-child]:pr-0",
          size === "sm" && "h-8 text-sm",
          size === "md" && "h-9 text-sm",
          size === "lg" && "h-10 text-base",
          className,
        ),
      )}
      {...props}
    />
  );
}

interface InputGroupAddonProps extends React.ComponentProps<"div"> {}

function InputGroupAddon({ className, ...props }: InputGroupAddonProps) {
  return (
    <div
      data-input-group-addon=""
      className={cn(
        "flex shrink-0 items-center justify-center px-2.5 text-white/50 [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

interface InputProps extends React.ComponentProps<typeof InputPrimitive.Input> {}

function Input({ className, ...props }: InputProps) {
  return (
    <InputPrimitive.Input
      data-input=""
      data-input-control=""
      className={composeRenderProps(className, (className) =>
        cn(
          "h-full w-full min-w-0 bg-transparent px-2 text-white placeholder:text-white/50 outline-none caret-white",
          className,
        ),
      )}
      {...props}
    />
  );
}

export type { InputGroupAddonProps, InputGroupProps, InputProps };
export { Input, InputGroup, InputGroupAddon };
