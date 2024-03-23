import * as React from "react";

import { cn } from "@/lib/utils";

export interface Props
  extends React.HTMLAttributes<HTMLDivElement> {}

const IconWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "text-white hover:bg-zinc-800 p-3 rounded-full cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
IconWrapper.displayName = "IconWrapper";

export { IconWrapper };
