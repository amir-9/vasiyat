// hooks/useAuth.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import type {
  LoginRequest,
  SignupRequest,
  VerifyOtpRequest,
} from "@/types/api";

/**
 * هوک درخواست OTP (مرحله اول)
 */
export function useRequestOtp() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authService.requestOtp(data),
    onError: (error) => {
      console.error("خطا در ارسال کد:", error);
    },
  });
}

/**
 * هوک تأیید OTP (مرحله دوم)
 */
export function useVerifyOtp() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => authService.verifyOtp(data),
    onSuccess: (response) => {
      // اگر signup: true بود، باید به صفحه signup بره
      if (response.data.signup) {
        // فعلا توکن رو ذخیره کن
        return;
      }

      // اگر signup: false بود، کاربر لاگین شده
      queryClient.setQueryData(["user"], response.data.user);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("خطا در تأیید کد:", error);
    },
  });
}

/**
 * هوک تکمیل ثبت‌نام (مرحله سوم - فقط برای کاربران جدید)
 */
export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onSuccess: () => {
      // بعد از signup موفق، به داشبورد هدایت کن
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("خطا در ثبت‌نام:", error);
    },
  });
}

/**
 * هوک خروج
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });
}

/**
 * هوک بررسی لاگین
 */
export function useIsAuthenticated() {
  return useQuery({
    queryKey: ["isAuthenticated"],
    queryFn: () => authService.isAuthenticated(),
    staleTime: Infinity,
  });
}
