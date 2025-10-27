"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShieldCheck, Lock, Cloud } from "lucide-react";

interface itemType {
  title: string;
  description: string;
}

const Security = () => {
  const t = useTranslations("security");
  const features = t.raw("features");
  const icons = [Lock, ShieldCheck, Cloud];

  return (
    <section className="py-24 bg-[#f0f8ff]" id="security">
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

        {/* کارت‌های ویژگی‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {features.map((item: itemType, index: number) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Icon className="w-10 h-10 text-blue-500 mb-4" />
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

export default Security;
