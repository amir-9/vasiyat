// services/auth.service.ts
import axiosInstance from "@/lib/axios";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ApiResponse,
} from "@/types/api";

class AuthService {
  /**
   * بررسی وجود کاربر با شماره موبایل
   */
  async checkUser(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await axiosInstance.post("/auth/check-user", data);
    return response.data;
  }

  /**
   * ثبت‌نام کاربر جدید
   */
  async signup(data: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data;
  }

  /**
   * تأیید کد OTP و ورود
   */
  async verifyOtp(
    data: VerifyOtpRequest
  ): Promise<ApiResponse<VerifyOtpResponse>> {
    const response = await axiosInstance.post("/auth/verify-otp", data);

    // ذخیره توکن‌ها در localStorage
    if (response.data.success) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
    }

    return response.data;
  }

  /**
   * رفرش توکن
   */
  async refreshToken(
    data: RefreshTokenRequest
  ): Promise<ApiResponse<RefreshTokenResponse>> {
    const response = await axiosInstance.post("/auth/refresh", data);

    // به‌روزرسانی توکن جدید
    if (response.data.success) {
      localStorage.setItem("token", response.data.data.token);
    }

    return response.data;
  }

  /**
   * خروج از حساب کاربری
   */
  async logout(): Promise<void> {
    try {
      await axiosInstance.post("/auth/logout");
    } finally {
      // پاک کردن توکن‌ها
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }

  /**
   * دریافت توکن فعلی
   */
  getToken(): string | null {
    return localStorage.getItem("token");
  }

  /**
   * بررسی وضعیت لاگین
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();
