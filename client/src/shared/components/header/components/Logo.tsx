import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className={cn("flex items-center gap-4 cursor-pointer select-none group py-2", className)}
    >
      {/* Biểu tượng Monogram L-H Cách điệu */}
      <div className="relative flex items-center justify-center">
        {/* Vòng tròn hở tinh tế */}
        <div className="absolute inset-[-6px] border border-[#A6894B]/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-out"></div>

        <div className="relative size-12 flex items-center justify-center border-l-2 border-[#A6894B] pl-1">
          <div className="flex flex-col -space-y-3">
            <span className="font-serif text-[32px] leading-none text-[#2D2D2D] group-hover:text-[#A6894B] transition-colors duration-500 font-light italic">
              L
            </span>
            <span className="font-serif text-[28px] leading-none text-[#A6894B] ml-3 font-light">
              H
            </span>
          </div>

          {/* Một nét gạch ngang cực mảnh tạo cảm giác kiến trúc */}
          <div className="absolute top-1/2 right-[-8px] w-6 h-[1px] bg-[#A6894B] opacity-40"></div>
        </div>
      </div>

      {/* Brand Identity */}
      <div className="flex flex-col">
        <div className="relative overflow-hidden">
          <h1 className="text-3xl sm:text-4xl font-serif tracking-[0.1em] text-[#2D2D2D] leading-none uppercase">
            Lux<span className="text-[#A6894B] font-light">house</span>
          </h1>
          {/* Hiệu ứng gạch chân chạy khi hover */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#A6894B] -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500"></div>
        </div>

        <div className="flex items-center gap-2 mt-1.5 overflow-hidden">
          <span className="text-[9px] uppercase tracking-[0.5em] font-medium text-gray-400 group-hover:translate-y-[-100%] transition-transform duration-300">
            Est. 2024 • Atelier
          </span>
          <span className="absolute text-[9px] uppercase tracking-[0.5em] font-bold text-[#A6894B] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300">
            Premium Nội Thất
          </span>
        </div>
      </div>
    </div>
  );
}
