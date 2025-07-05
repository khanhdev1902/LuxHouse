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
        <p className="text-lg font-semibold">{product?.title}</p>
        <p className="">500.000 đ</p>
        <div className="flex flex-row justify-between">
          <Rating/>
          <span>Đã bán 27</span>
        </div>
        <div className="flex flex-row gap-2">
          <div className=" inline-block w-6 h-6 rounded-full border border-cyan-500 bg-col"></div>
          <div className=" inline-block w-6 h-6 rounded-full border border-cyan-500 bg-col"></div>
        </div>
      </div>
    </div>
  );
}
