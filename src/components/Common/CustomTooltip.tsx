import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  title: string;
  delayDuration?: number;
  children: React.ReactNode;
}

export default function CustomTooltip({
  title,
  delayDuration = 400,
  children,
}: Props) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{title ?? "Tooltip"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
