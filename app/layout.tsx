// app/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

import "./styles/globals.css";
import Navbar from "@/components/utils/Navbar";
import { ReactQueryProvider } from "@/lib/react-query";

export const metadata: Metadata = {
  title: "یادگار",
  description: "سرویس آنلاین نوشتن وصیت‌نامه دیجیتال",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"fa"} dir="rtl">
      <body className="bg-gray-50 text-gray-900 font-yekan antialiased">
        <ReactQueryProvider>
          <NextIntlClientProvider>
            <Navbar />
            {children}
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
