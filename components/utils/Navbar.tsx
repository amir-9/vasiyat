"use client";

import { useTranslations } from "next-intl";
import Button from "./Button";

const Navbar = () => {
  const t = useTranslations("landing");

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-[1px] bg-black/15">
      <div className="flex justify-between items-center py-4 relative container xl:max-w-7xl mx-auto">
        <div className="text-white text-xl font-yekan font-bold">وصیت‌نامه</div>
        <Button variant="primary" size="md" href="/login">
          {t("loginSignup")}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
