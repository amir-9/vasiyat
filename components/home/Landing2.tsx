"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  UserGroupIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/utils/Button";
import Image from "next/image";

const Landing2 = () => {
  const t = useTranslations("landing");
  const [stats] = useState({
    users: 500,
    wills: 200,
    sent: 100,
  });

  const statsCardsData = [
    {
      value: stats.users,
      label: t("statsUsers"),
      desc: t("statsUsersDesc"),
      icon: UserGroupIcon,
    },
    {
      value: stats.wills,
      label: t("statsWills"),
      desc: t("statsWillsDesc"),
      icon: DocumentTextIcon,
    },
    {
      value: stats.sent,
      label: t("statsSent"),
      desc: t("statsSentDesc"),
      icon: PaperAirplaneIcon,
    },
  ];

  return (
    <div
      className="min-h-screen bg-blue-50 flex flex-col justify-between relative"
      dir="rtl"
    >
      {/* bg */}
      <div className="w-full aspect-[4.1/1] relative">
        <Image
          src={"/images/home/lake.webp"}
          alt="دریاچه"
          fill
          className="object-cover"
        ></Image>
        <div className="absolute h-20 bottom-0 w-full bg-gradient-to-white"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 600">
          <path
            fill="url(#gradient)"
            d="M0,400C200,300,400,500,720,400C1040,300,1240,500,1440,400V600H0Z"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#4B6CB7", stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#89CFF0", stopOpacity: 0 }}
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <main className="container mx-auto px-4 flex flex-col items-center text-center pt-16 pb-12">
        <motion.h1
          className="text-4xl md:text-5xl max-w-3xl leading-tight font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("heroTitle")}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 mt-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("heroSubtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="primary"
            size="lg"
            href="/login"
            className="mt-6 flex items-center gap-2 bg-primary/30 backdrop-blur-sm border border-white/20"
          >
            {t("start")}
          </Button>
          <Button
            variant="secondary"
            size="md"
            href="/about"
            className="mt-6 mr-4"
          >
            بیشتر بدانید
          </Button>
        </motion.div>
      </main>

      <motion.section
        className=" py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          {statsCardsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex-1 p-6 rounded-lg text-center bg-white/80 backdrop-blur-sm shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="text-3xl font-bold text-gray-900">
                <CountUp start={0} end={stat.value} duration={2.5} />+
              </h3>
              <p className="text-lg text-gray-700">{stat.label}</p>
              <p className="text-sm text-gray-500">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Landing2;
