import Rating from "@/components/ui/Rating";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Product {
  title?: string;
  image_1?: string;
  image_2?: string;
  price?: number;
  discount?: number;
  sold?: number;
  rating?: number;
  rating_users?: number;
}

interface ProductCardProps {
  className?: string;
  product?: Product;
}
export default function ProductCard({ className, product }: ProductCardProps) {
  const navigation = useNavigate();
  return (
    <div
      className={cn(" relative cursor-pointer select-none ", className)}
      onClick={() => navigation("products/1")}
    >
      {(product?.discount ?? 0) > 0 && (
        <span className=" absolute top-1 left-0 z-20 bg-red-500 text-white py-1 px-3 rounded-br-lg text-xs font-medium opacity-95">
          {`${((product?.discount ?? 0) * 100).toString().slice(0, 2)}%`}
        </span>
      )}
      <img src={product?.image_1} alt={product?.title || "Product Card"} />
      <motion.img
        src={product?.image_2}
        alt={product?.title || "Product Card"}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className=" absolute top-0 left-0 z-10"
      />
      <div className=" py-1 space-y-2">
        <p className=" font-semibold line-clamp-2 min-h-[3em] leading-snug">
          {product?.title}
        </p>
        <div className="flex flex-row gap-2 text-xs sm:text-sm">
          <span className="price-color">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format((product?.price ?? 0) * (1 - (product?.discount ?? 0)))}
          </span>

          <span className="text-[#939393] line-through decoration-1">
            {/* {product?.price?.toLocaleString("vi-VN")} */}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product?.price ?? 0)}
          </span>
        </div>
        <div className="flex flex-row justify-between flex-wrap">
          <div className="flex flex-row gap-1 items-center text-xs sm:text-sm">
            <Rating number={product?.rating} />
            <span>{`(${product?.rating_users ?? 0})`}</span>
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
