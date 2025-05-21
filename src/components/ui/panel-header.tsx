import React from "react";
import { cn } from "@/lib/utils";

type PanelHeaderProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  variant?: "primary";
};

const PanelHeader: React.FC<PanelHeaderProps> = ({ className, ...props }) => {
  return (
    <h2
      className={cn(
        "font-bold text-3xl text-gray-900 dark:text-gray-100",
        className
      )}
      {...props}
    />
  );
};

export default PanelHeader;
