import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
interface LogoProps {
  className?: string;
}
export default function Logo({ className }: LogoProps) {
  const navigation = useNavigate()
  return (
    <div className={cn("flex flex-row gap-2 justify-start items-center cursor-pointer",className)}
      onClick={()=>navigation("/")}
    >
    <h1 className={cn("text-[40px] m-0 p-0 font-bold text-col")}>ZORO</h1>
    </div>
  );
}
