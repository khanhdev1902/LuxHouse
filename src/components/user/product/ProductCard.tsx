import Rating from "@/components/ui/Rating";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
const image =
  "https://cdn.hstatic.net/products/200000065946/pro_nau_combo_phong_ngu_2_san_pham_scarlet_noi_that_moho_10a7d498d2604a449b704b2dd0fa3f01_master.jpg";
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
        " relative cursor-pointer select-none ",
        className
      )}
    >
      <div className=" absolute top-1 left-0 z-50 bg-red-500 text-white py-1 px-3 rounded-br-lg text-sm opacity-95">
        35%
      </div>
      <img src={product?.image} alt={product?.title || "Product Card"} />
      <motion.img
        src={image}
        alt={product?.title || "Product Card"}
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0 }}
        transition={{ duration: 0.3, ease:"easeInOut" }}
        className=" absolute top-0 left-0 z-10"
      />
      <div className=" py-1 space-y-2">
        <p className=" font-semibold line-clamp-2 min-h-[3em] leading-snug">
          {product?.title}
        </p>
        <div className="flex flex-row gap-2 text-xs sm:text-sm">
          <span className="price-color">32,500.000 đ</span>
          <span className="text-[#939393] line-through decoration-1">
            42,900.000đ
          </span>
        </div>
        <div className="flex flex-row justify-between flex-wrap">
          <div className="flex flex-row gap-1 items-center text-xs sm:text-sm">
            <Rating number={4.5} />
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
