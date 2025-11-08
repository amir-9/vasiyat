// hooks/useUser.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import userService from "@/services/user.service";
import type { UpdateProfileRequest, CheckInRequest } from "@/types/api";

/**
 * هوک دریافت اطلاعات پروفایل
 */
export function useProfile() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getProfile(),
  });
}

/**
 * هوک به‌روزرسانی پروفایل
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => userService.updateProfile(data),
    onSuccess: () => {
      // به‌روزرسانی کش پروفایل
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

/**
 * هوک حذف حساب کاربری
 */
export function useDeleteAccount() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userService.deleteAccount(),
    onSuccess: () => {
      // پاک کردن تمام کش‌ها
      queryClient.clear();
      // هدایت به صفحه اصلی
      router.push("/");
    },
  });
}

/**
 * هوک ثبت چک‌این
 */
export function useCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CheckInRequest) => userService.checkIn(data),
    onSuccess: () => {
      // به‌روزرسانی اطلاعات چک‌این بعدی
      queryClient.invalidateQueries({ queryKey: ["nextCheckIn"] });
    },
  });
}

/**
 * هوک دریافت تاریخ چک‌این بعدی
 */
export function useNextCheckIn() {
  return useQuery({
    queryKey: ["nextCheckIn"],
    queryFn: () => userService.getNextCheckIn(),
  });
}
