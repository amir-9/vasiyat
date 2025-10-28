import type { Metadata } from "next";

import Footer from "@/components/utils/Footer";

export const metadata: Metadata = {
  title: "وصیت‌نامه",
  description: "برای آینده. وصیت‌نامه خودت رو بنویس ",
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
