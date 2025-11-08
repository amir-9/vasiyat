// services/will.service.ts
import axiosInstance from "@/lib/axios";
import type {
  Will,
  CreateWillRequest,
  UpdateWillRequest,
  DeleteWillRequest,
  PaginatedResponse,
  PaginationParams,
  ApiResponse,
} from "@/types/api";

class WillService {
  /**
   * دریافت لیست وصیت‌نامه‌ها
   */
  async getWills(
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<Will>>> {
    const response = await axiosInstance.get("/wills", { params });
    return response.data;
  }

  /**
   * دریافت یک وصیت‌نامه با ID
   */
  async getWillById(id: string): Promise<ApiResponse<Will>> {
    const response = await axiosInstance.get(`/wills/${id}`);
    return response.data;
  }

  /**
   * ایجاد وصیت‌نامه جدید
   */
  async createWill(data: CreateWillRequest): Promise<ApiResponse<Will>> {
    const response = await axiosInstance.post("/wills", data);
    return response.data;
  }

  /**
   * به‌روزرسانی وصیت‌نامه
   */
  async updateWill(data: UpdateWillRequest): Promise<ApiResponse<Will>> {
    const { id, ...updateData } = data;
    const response = await axiosInstance.put(`/wills/${id}`, updateData);
    return response.data;
  }

  /**
   * حذف وصیت‌نامه
   */
  async deleteWill(data: DeleteWillRequest): Promise<ApiResponse<void>> {
    const response = await axiosInstance.delete(`/wills/${data.id}`);
    return response.data;
  }

  /**
   * فعال‌سازی وصیت‌نامه
   */
  async activateWill(id: string): Promise<ApiResponse<Will>> {
    const response = await axiosInstance.post(`/wills/${id}/activate`);
    return response.data;
  }

  /**
   * غیرفعال‌سازی وصیت‌نامه
   */
  async deactivateWill(id: string): Promise<ApiResponse<Will>> {
    const response = await axiosInstance.post(`/wills/${id}/deactivate`);
    return response.data;
  }
}

export default new WillService();
