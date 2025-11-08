// services/user.service.ts
import axiosInstance from "@/lib/axios";
import type {
  User,
  UpdateProfileRequest,
  CheckInRequest,
  CheckInResponse,
  ApiResponse,
} from "@/types/api";

class UserService {
  /**
   * دریافت اطلاعات پروفایل
   */
  async getProfile(): Promise<ApiResponse<User>> {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
  }

  /**
   * به‌روزرسانی پروفایل
   */
  async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<User>> {
    const response = await axiosInstance.put("/user/profile", data);
    return response.data;
  }

  /**
   * حذف حساب کاربری
   */
  async deleteAccount(): Promise<ApiResponse<void>> {
    const response = await axiosInstance.delete("/user/account");
    return response.data;
  }

  /**
   * ثبت چک‌این (تأیید زنده بودن)
   */
  async checkIn(data: CheckInRequest): Promise<ApiResponse<CheckInResponse>> {
    const response = await axiosInstance.post("/user/check-in", data);
    return response.data;
  }

  /**
   * دریافت تاریخ چک‌این بعدی
   */
  async getNextCheckIn(): Promise<ApiResponse<{ nextCheckInDate: string }>> {
    const response = await axiosInstance.get("/user/next-check-in");
    return response.data;
  }
}

export default new UserService();
