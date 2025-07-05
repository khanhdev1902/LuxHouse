// components/ProductSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { cn } from "@/lib/utils"
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

interface ProductSliderProps {
  title?: string;
  products: Product[];
  slidesPerView?: number;
  className?: string;
}

export default function ProductSlider({
  title,
  products,
  slidesPerView = 4,
  className,
}: ProductSliderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {title && <span className="text-2xl font-bold text-col">{title}</span>}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        // pagination={{ clickable: true }}
        spaceBetween={15}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 }, //sm
          1024: { slidesPerView: 3 },//lg
          1280: { slidesPerView: slidesPerView },//xl
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className=" h-auto pb-12 custom-rate-spacing">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}