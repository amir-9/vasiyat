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
 * هوک بررسی وجود کاربر
 */
export function useCheckUser() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authService.checkUser(data),
    onError: (error) => {
      console.error("خطا در بررسی کاربر:", error);
    },
  });
}

/**
 * هوک ثبت‌نام
 */
export function useSignup() {
  return useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onError: (error) => {
      console.error("خطا در ثبت‌نام:", error);
    },
  });
}

/**
 * هوک تأیید OTP و ورود
 */
export function useVerifyOtp() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => authService.verifyOtp(data),
    onSuccess: (response) => {
      // ذخیره اطلاعات کاربر در کش
      queryClient.setQueryData(["user"], response.data.user);
      // هدایت به داشبورد
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("خطا در تأیید کد:", error);
    },
  });
}

/**
 * هوک خروج از حساب
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // پاک کردن تمام کش‌ها
      queryClient.clear();
      // هدایت به صفحه ورود
      router.push("/login");
    },
  });
}

/**
 * هوک بررسی وضعیت لاگین
 */
export function useIsAuthenticated() {
  return useQuery({
    queryKey: ["isAuthenticated"],
    queryFn: () => authService.isAuthenticated(),
    staleTime: Infinity,
  });
}
