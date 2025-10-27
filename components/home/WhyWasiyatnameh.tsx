"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Heart, PenLine, Shield } from "lucide-react";

interface itemType {
  title: string;
  description: string;
}

const WhyWasiyatnameh = () => {
  const t = useTranslations("whyWasiyatnameh");
  const points = t.raw("points");
  const icons = [Heart, PenLine, Shield];

  return (
    <section className="py-24 bg-white" id="why-wasiyatnameh">
      <div className="container text-center">
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
          className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("subtitle")}
        </motion.p>

        {/* کارت‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {points.map((item: itemType, index: number) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                className="flex flex-col items-start bg-[#f8fbff] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Icon className="size-16 text-blue-500 mb-10" />
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyWasiyatnameh;
