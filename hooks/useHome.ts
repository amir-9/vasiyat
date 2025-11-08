// hooks/useHome.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import homeService from "@/services/home.service";

/**
 * هوک دریافت اطلاعات صفحه اصلی
 */
export function useHomeData() {
  return useQuery({
    queryKey: ["home"],
    queryFn: () => homeService.getHomeData(),
    staleTime: 5 * 60 * 1000, // 5 دقیقه
  });
}
