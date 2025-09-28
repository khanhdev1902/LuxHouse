import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
const slideShows = [
  "/slideshow_1_master.jpg",
  "/slideshow_3_master.jpg",
  "/slideshow_4_master.jpg",
];
import React, { useRef } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function Banner() {
  const swiperRef = useRef<any>(null);
  const [isHover, setIsHover] = React.useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className=" relative w-full group"
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[EffectFade, Autoplay]}
        slidesPerView={1}
        loop
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={1500}
        className="cursor-pointer"
      >
        <motion.button
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: isHover ? 0 : 70, opacity: isHover ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          whileTap={{ scale: 0.8 }}
          onClick={() => swiperRef.current?.slidePrev(300)}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-10"
        >
          <ArrowBigLeft className=" size-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 p-2 text-white opacity-70" />
        </motion.button>
        <motion.button
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: isHover ? 0 : -70, opacity: isHover ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          whileTap={{ scale: 0.8 }}
          onClick={() => swiperRef.current?.slidePrev(300)}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-10"
        >
          <ArrowBigRight className=" size-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 p-2 text-white opacity-80" />
        </motion.button>
        {slideShows.map((src, i) => (
          <SwiperSlide key={i}>
            <img src={src} alt="" className="w-full h-auto object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
