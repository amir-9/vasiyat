// utils/error-handler.ts
import { AxiosError } from "axios";

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = "خطای نامشخص"
): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || defaultMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};
