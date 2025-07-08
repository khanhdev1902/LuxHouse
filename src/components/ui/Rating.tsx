import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
interface RatingProps {
  className?: string
  number?:number
}
export default function Rating({className, number=0}:RatingProps) {
  return (
    <div className={cn("flex flex-row gap-1", className)}>
      {Array.from({length:5}, (_, i)=>(
        number-i>0.5 ? <FaStar key={i}  className="size-5 text-[#EF683A]"/>
        :number-i>0 ? <FaRegStarHalfStroke key={i} className="size-5 text-[#EF683A]"/>
        :<FaRegStar key={i} className="size-5 text-[#EF683A]"/>
      ))}
    </div>
  )
}
