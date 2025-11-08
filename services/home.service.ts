// services/home.service.ts
import axiosInstance from "@/lib/axios";
import type { HomeData } from "@/types/api";

class HomeService {
  /**
   * دریافت اطلاعات صفحه اصلی
   * GET /api/v1/home/index
   */
  async getHomeData(): Promise<HomeData> {
    const response = await axiosInstance.get("/v1/home/index");
    return response.data;
  }
}

export default new HomeService();
