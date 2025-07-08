import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Banner() {
  return (
    <div className="w-full ">
      <Swiper navigation slidesPerView={1} modules={[Navigation, Pagination]} loop={true}>
        <SwiperSlide>
          <img
            src="/slideshow_1.jpg"
            alt=""
            className="h-auto object-cover w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/slideshow_2.jpg"
            alt=""
            className="h-auto object-cover w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/slideshow_3.jpg"
            alt=""
            className="h-auto object-cover w-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
