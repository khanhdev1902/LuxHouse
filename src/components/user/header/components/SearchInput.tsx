import { cn } from "@/lib/utils";
import { IoSearchSharp } from "react-icons/io5";

interface SearchInputProps {
  className?: string;
}

export default function SearchInput({ className }: SearchInputProps) {
  return (
    <div
      className={cn(
        "relative group w-full sm:w-[400px] xl:focus-within:w-[600px] border-2 rounded-3xl focus-within:border-cyan-500 transition-all duration-500 ease-in-out",
        className
      )}
    >
      <input
        placeholder="Tìm kiếm sản phẩm...."
        className="pl-4 pr-16 py-3 border  rounded-3xl w-full
        transition-all duration-500 ease-in-out
        focus:ring-2 focus:ring-cyan-500 focus:outline-none"
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer 
        p-2 text-white text-2xl rounded-full
        hover:scale-110 active:scale-90 transition-all duration-300 ease-in-out
        bg-gradient-to-r from-cyan-500 to-purple-500 shadow-xl"
      >
        <IoSearchSharp />
      </button>
    </div>
  );
}

{
  /* <div className="relative group w-80 transition-all duration-500 ease-in-out focus-within:w-[500px]">
  <input
    placeholder="Tìm kiếm sản phẩm...."
    className="pl-4 pr-16 py-3 border rounded-3xl w-full
    transition-all duration-500 ease-in-out
    focus:ring-2 focus:ring-cyan-500 focus:outline-none"
  />
  <button
    className="absolute right-2 top-1/2 -translate-y-1/2 translate-x-3 opacity-0
      group-focus-within:translate-x-0 group-focus-within:opacity-100
      transition-all duration-500 ease-in-out
      p-2 text-white text-2xl rounded-full
      hover:scale-110 active:scale-90
      bg-gradient-to-r from-cyan-500 to-purple-500 shadow-xl"
  >
    <IoSearchSharp />
  </button>
</div> */
}
