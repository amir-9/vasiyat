"use client";

import { motion } from "framer-motion";
import { Lightbulb, Edit3, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: <Lightbulb className="w-10 h-10 text-blue-500" />,
    title: "ورود و ساخت حساب",
    description:
      "به‌سادگی وارد سایت شو و با شماره تلفنت ثبت‌نام کن. بدون نیاز به ایمیل یا رمز عبور پیچیده.",
  },
  {
    icon: <Edit3 className="w-10 h-10 text-blue-500" />,
    title: "نوشتن وصیت‌نامه",
    description:
      "وصیت‌نامه‌ات رو با راهنمای ساده و سریع بنویس. هر بند رو می‌تونی در هر زمان ویرایش کنی.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
    title: "ذخیره امن و همیشه در دسترس",
    description:
      "تمام اطلاعاتت به‌صورت رمزگذاری‌شده نگهداری می‌شن و فقط خودت بهش دسترسی داری.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-[#89CFF0]/20" id="how-it-works">
      <div className="container text-center">
        <motion.h2
          className="text-4xl font-bold mb-4 text-blue-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          چطور کار می‌کنه؟
        </motion.h2>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          در سه قدم ساده، وصیت‌نامه‌ات رو بساز و خیالت رو راحت کن.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
