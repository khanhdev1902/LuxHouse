import Rating from "@/components/ui/Rating";
import { cn } from "@/lib/utils";
import type { ProductListItem } from "@/types/product";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  className?: string;
  product?: ProductListItem;
}
export default function ProductCard({ className, product }: ProductCardProps) {
  const navigation = useNavigate();
  console.log("ProductCard render");
  console.log(product);
  return (
    <div
      className={cn(" relative cursor-pointer select-none ", className)}
      onClick={() => navigation(`/products/${product?.slug}`)}
    >
      {(product?.discountPercent ?? 0) > 0 && (
        <span className=" absolute top-1 left-0 z-20 bg-red-600 text-white py-1 px-3 rounded-br-lg text-sm font-normal">
          {`-${product?.discountPercent ?? 0}%`}
        </span>
      )}
      <img src={product?.images[0]} alt={product?.name || "Product Card"} />
      <motion.img
        src={product?.images[1]}
        alt={product?.name || "Product Card"}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className=" absolute top-0 left-0 z-10"
      />
      <div className=" py-1 space-y-2">
        <p className=" font-semibold line-clamp-2 min-h-[3em] leading-snug">{product?.name}</p>
        <div className="flex flex-row gap-2 text-xs sm:text-sm">
          <span className="price-color">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product?.price ?? 0)}
          </span>

          <span className="text-[#939393] line-through decoration-1">
            {/* {product?.price?.toLocaleString("vi-VN")} */}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product?.originalPrice ?? 0)}
          </span>
        </div>
        <div className="flex flex-row justify-between flex-wrap">
          <div className="flex flex-row gap-1 items-center text-xs sm:text-sm">
            <Rating rating={product?.averageRating ?? 0} />
            <span>{`(${product?.reviewCount ?? 0})`}</span>
          </div>
          <span>{`Đã bán ${product?.sold ?? 0}`}</span>
        </div>
        <div className="flex flex-row gap-2">
          <div className=" inline-block w-6 h-6 rounded-full border hover:border-gray-200 bg-[#D2AF84]"></div>
          <div className=" inline-block w-6 h-6 rounded-full border hover:border-gray-200 bg-[#d3d0d3]"></div>
        </div>
      </div>
    </div>
  );
}
