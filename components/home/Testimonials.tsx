"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote } from "lucide-react";

interface itemType {
  role: string;
  text: string;
}

const Testimonials = () => {
  const t = useTranslations("testimonials");
  const testimonials = t.raw("list");

  return (
    <section className="py-24 bg-white" id="testimonials">
      <div className="text-center">
        {/* عنوان */}
        <motion.h2
          className="text-4xl font-bold mb-4 text-blue-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("title")}
        </motion.h2>

        {/* زیرعنوان */}
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("subtitle")}
        </motion.p>

        {/* اسلایدر */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          centeredSlides={true}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3.9 },
          }}
          className="pb-10!"
        >
          {testimonials.map((item: itemType, index: number) => {
            return (
              <SwiperSlide key={index}>
                <motion.div
                  className="rounded-[20px] text-white h-[321px] transition-all duration-300 py-8 px-6 flex flex-col items-start justify-between shadow-md hover:shadow-lg overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(rgb(36, 119, 170) 0%, rgb(100, 97, 224) 100%)",
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Quote className="size-16 mb-4 mr-4 text-white opacity-75" />
                  <p className="italic mb-4 leading-relaxed text-lg">
                    “{item.text}”
                  </p>
                  <h5 className="font-semibold text-blue-100">{item.role}</h5>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
