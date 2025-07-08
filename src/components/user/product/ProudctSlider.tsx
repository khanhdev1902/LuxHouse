// components/ProductSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
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
    <div className={cn("space-y-6 group", className)}>
      <div className="flex flex-row justify-between">
      {title && <span className="text-2xl font-bold text-col">{title}</span>}
      <span className=" font-semibold price-color cursor-pointer">Xem thêm</span>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        // pagination={{ clickable: true }}
        spaceBetween={15}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 }, //sm
          1024: { slidesPerView: 3 }, //lg
          1280: { slidesPerView: slidesPerView }, //xl
        }}
      >
        <div className=" opacity-0 group-hover:opacity-100 active:opacity-100">
          <div className="custom-prev ml-60">←</div>
          <div className="custom-next">→</div>
        </div>
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className=" h-auto pb-12 custom-rate-spacing"
          >
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
