import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { CiCircleInfo } from "react-icons/ci";

export const ToolTipDisplyInfo = ({ description }: { description: String }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CiCircleInfo />
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
