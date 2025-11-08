// services/media.service.ts
import axiosInstance from "@/lib/axios";
import type {
  MediaFile,
  UploadMediaRequest,
  UploadMediaResponse,
  ApiResponse,
} from "@/types/api";

class MediaService {
  /**
   * آپلود فایل رسانه‌ای
   */
  async uploadMedia(
    data: UploadMediaRequest
  ): Promise<ApiResponse<UploadMediaResponse>> {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("willId", data.willId);

    const response = await axiosInstance.post("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  /**
   * دریافت لیست فایل‌های یک وصیت‌نامه
   */
  async getWillMedia(willId: string): Promise<ApiResponse<MediaFile[]>> {
    const response = await axiosInstance.get(`/media/will/${willId}`);
    return response.data;
  }

  /**
   * حذف فایل رسانه‌ای
   */
  async deleteMedia(mediaId: string): Promise<ApiResponse<void>> {
    const response = await axiosInstance.delete(`/media/${mediaId}`);
    return response.data;
  }

  /**
   * دانلود فایل رسانه‌ای
   */
  async downloadMedia(mediaId: string): Promise<Blob> {
    const response = await axiosInstance.get(`/media/${mediaId}/download`, {
      responseType: "blob",
    });
    return response.data;
  }
}

export default new MediaService();
