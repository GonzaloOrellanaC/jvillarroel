import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
  images: string[];
}

const NewsImageSwiper: React.FC<Props> = ({ images }) => (
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 3500, disableOnInteraction: false }}
    loop
    className="mb-2 rounded"
  >
    {images.map((img, i) => (
      <SwiperSlide key={i}>
  <img src={img} alt="noticia" className="rounded w-full" style={{ minHeight: 300, maxHeight: 400, objectFit: 'contain' }} />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default NewsImageSwiper;
