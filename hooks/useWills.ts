// hooks/useWills.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import willService from "@/services/will.service";
import type {
  CreateWillRequest,
  UpdateWillRequest,
  DeleteWillRequest,
  PaginationParams,
} from "@/types/api";

/**
 * هوک دریافت لیست وصیت‌نامه‌ها
 */
export function useWills(params?: PaginationParams) {
  return useQuery({
    queryKey: ["wills", params],
    queryFn: () => willService.getWills(params),
  });
}

/**
 * هوک دریافت یک وصیت‌نامه
 */
export function useWill(id: string) {
  return useQuery({
    queryKey: ["will", id],
    queryFn: () => willService.getWillById(id),
    enabled: !!id,
  });
}

/**
 * هوک ایجاد وصیت‌نامه
 */
export function useCreateWill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWillRequest) => willService.createWill(data),
    onSuccess: () => {
      // به‌روزرسانی لیست وصیت‌نامه‌ها
      queryClient.invalidateQueries({ queryKey: ["wills"] });
    },
  });
}

/**
 * هوک به‌روزرسانی وصیت‌نامه
 */
export function useUpdateWill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateWillRequest) => willService.updateWill(data),
    onSuccess: (_, variables) => {
      // به‌روزرسانی کش وصیت‌نامه خاص
      queryClient.invalidateQueries({ queryKey: ["will", variables.id] });
      // به‌روزرسانی لیست وصیت‌نامه‌ها
      queryClient.invalidateQueries({ queryKey: ["wills"] });
    },
  });
}

/**
 * هوک حذف وصیت‌نامه
 */
export function useDeleteWill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteWillRequest) => willService.deleteWill(data),
    onSuccess: () => {
      // به‌روزرسانی لیست وصیت‌نامه‌ها
      queryClient.invalidateQueries({ queryKey: ["wills"] });
    },
  });
}

/**
 * هوک فعال‌سازی وصیت‌نامه
 */
export function useActivateWill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => willService.activateWill(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["will", id] });
      queryClient.invalidateQueries({ queryKey: ["wills"] });
    },
  });
}

/**
 * هوک غیرفعال‌سازی وصیت‌نامه
 */
export function useDeactivateWill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => willService.deactivateWill(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["will", id] });
      queryClient.invalidateQueries({ queryKey: ["wills"] });
    },
  });
}
