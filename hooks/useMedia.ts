// hooks/useMedia.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import mediaService from "@/services/media.service";
import type { UploadMediaRequest } from "@/types/api";

/**
 * هوک آپلود فایل رسانه‌ای
 */
export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UploadMediaRequest) => mediaService.uploadMedia(data),
    onSuccess: (_, variables) => {
      // به‌روزرسانی لیست فایل‌های وصیت‌نامه
      queryClient.invalidateQueries({
        queryKey: ["media", variables.willId],
      });
    },
  });
}

/**
 * هوک دریافت لیست فایل‌های یک وصیت‌نامه
 */
export function useWillMedia(willId: string) {
  return useQuery({
    queryKey: ["media", willId],
    queryFn: () => mediaService.getWillMedia(willId),
    enabled: !!willId,
  });
}

/**
 * هوک حذف فایل رسانه‌ای
 */
export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mediaId: string) => mediaService.deleteMedia(mediaId),
    onSuccess: () => {
      // به‌روزرسانی تمام کش‌های media
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
}

/**
 * هوک دانلود فایل رسانه‌ای
 */
export function useDownloadMedia() {
  return useMutation({
    mutationFn: (mediaId: string) => mediaService.downloadMedia(mediaId),
    onSuccess: (blob, mediaId) => {
      // ایجاد لینک دانلود
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `media-${mediaId}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });
}
