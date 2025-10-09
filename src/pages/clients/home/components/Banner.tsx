import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import { slideShowDesktop, slideShowMObile } from "@/constant/const-home";

export default function Banner() {
  const swiperRef = React.useRef<any>(null);
  const [isHover, setIsHover] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const slides = isMobile ? slideShowMObile : slideShowDesktop;

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
          <TbArrowBigLeft className=" size-12 rounded-full bg-col p-2 text-white opacity-70" />
        </motion.button>
        <motion.button
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: isHover ? 0 : -70, opacity: isHover ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          whileTap={{ scale: 0.8 }}
          onClick={() => swiperRef.current?.slidePrev(300)}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-10"
        >
          <TbArrowBigRight className=" size-12 rounded-full bg-col p-2 text-white opacity-80" />
        </motion.button>
        {slides.map((slideshow, i) => (
          <SwiperSlide key={i}>
            <img src={slideshow} alt="" className="w-full h-auto object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
