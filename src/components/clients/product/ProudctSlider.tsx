// components/ProductSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";
import useToggle from "@/hooks/useToggle";
import { TbArrowMoveLeft, TbArrowMoveRight } from "react-icons/tb";

interface Product {
  id?: number;
  title?: string;
  image_1?: string;
  image_2?: string;
  price?: number;
  discount?: number;
  sold?: number;
  rating?: number;
  rating_users?: number;
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
  const { value: isHover, on, off } = useToggle();
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-row justify-between">
        {title && <span className="text-2xl font-bold text-col">{title}</span>}
        <button className=" font-semibold price-color cursor-pointer opacity-90">
          Xem thêm
        </button>
      </div>
      <motion.div onHoverStart={on} onHoverEnd={off}>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          loop
          spaceBetween={15}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 }, //sm
            1024: { slidesPerView: 3 }, //lg
            1280: { slidesPerView: slidesPerView }, //xl
          }}
          className=" relative"
        >
          <>
            <motion.button
              whileTap={{ scale: 0.8 }}
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: isHover ? 0 : 80, opacity: isHover ? 0.9 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="custom-prev absolute top-1/3 left-4 text-2xl
            text-white z-10 select-none cursor-pointer rounded-full 
              p-3 bg-col"
            >
              <TbArrowMoveLeft />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.8 }}
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: isHover ? 0 : -80, opacity: isHover ? 0.9 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="custom-next absolute top-1/3 right-4 text-2xl
          text-white z-10 select-none cursor-pointer rounded-full 
            p-3 bg-col"
            >
              <TbArrowMoveRight />
            </motion.button>
          </>
          {products.map((product) => (
            <SwiperSlide
              key={product?.id}
              className=" h-auto pb-12 custom-rate-spacing"
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}
