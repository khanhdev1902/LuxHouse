// import { VscAccount } from "react-icons/vsc";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";

export default function Account() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Hover me
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="bg-black text-white px-3 py-2 rounded shadow-lg"
      >
        <p>Add to library</p>
        <TooltipArrow className="fill-black" />
        {/* 👆 chính là mũi tên, có thể chỉnh màu theo bg */}
      </TooltipContent>
    </Tooltip>
  );
}
