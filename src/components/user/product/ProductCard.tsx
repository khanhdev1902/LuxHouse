import Rating from "@/components/ui/Rating";
import { cn } from "@/lib/utils";
interface Product {
  title?: string;
  image?: string;
  price?: number;
}

interface ProductCardProps {
  className?: string;
  product?: Product;
}
export default function ProductCard({ className, product }: ProductCardProps) {
  return (
    <div
      className={cn(
        " relative cursor-pointer transition-transform duration-300 delay-75 ease-in-out ",
        className
      )}
    >
      <div className=" absolute top-1 left-0 bg-red-500 text-white py-1 px-3 rounded-br-lg text-sm">
        35%
      </div>
      <img src={product?.image} alt={product?.title || "Product Card"} />
      <div className=" py-1 space-y-2">
        <p className=" font-semibold line-clamp-2 min-h-[3em] leading-snug">{product?.title}</p>
        <div className="flex flex-row gap-2 text-xs sm:text-sm">
          <span className="price-color">32,500.000 đ</span>
          <span className="text-[#939393] line-through decoration-1">
            42,900.000đ
          </span>
        </div>
        <div className="flex flex-row justify-between flex-wrap">
          <div className="flex flex-row gap-1 items-center text-xs sm:text-sm">
            <Rating number={4.5}/>
            <span>{`(${29})`}</span>
          </div>
          <span>Đã bán 27</span>
        </div>
        <div className="flex flex-row gap-2">
          <div className=" inline-block w-6 h-6 rounded-full border hover:border-gray-200 bg-[#D2AF84]"></div>
          <div className=" inline-block w-6 h-6 rounded-full border hover:border-gray-200 bg-[#d3d0d3]"></div>
        </div>
      </div>
    </div>
  );
}
