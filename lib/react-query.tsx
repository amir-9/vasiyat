// lib/react-query.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // زمان کش به مدت 5 دقیقه
            staleTime: 5 * 60 * 1000,
            // نگهداری کش به مدت 10 دقیقه
            gcTime: 10 * 60 * 1000,
            // تلاش مجدد در صورت خطا
            retry: 1,
            // رفرش خودکار هنگام focus کردن
            refetchOnWindowFocus: false,
          },
          mutations: {
            // تلاش مجدد برای mutation ها
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
