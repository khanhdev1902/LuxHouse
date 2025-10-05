import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { FaHouseTsunami } from "react-icons/fa6";
interface LogoProps {
  className?: string;
}
export default function Logo({ className }: LogoProps) {
  const navigation = useNavigate()
  return (
    <div className={cn("flex flex-row gap-3 justify-start items-center cursor-pointer select-none",className)}
      onClick={()=>navigation("/")}
    >
      <FaHouseTsunami className="size-10 text-[#c02425] "/>
    <h1 className={cn("text-[42px] m-0 p-0 font-bold text-col")}>LuxHouse</h1>
    </div>
  );
}
