import type { Metadata } from "next";

import Footer from "@/components/utils/Footer";

export const metadata: Metadata = {
  title: "یادگار",
  description: "سرویس آنلاین نوشتن وصیت‌نامه دیجیتال",
};

export default async function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
