// examples/WillsListExample.tsx
"use client";

import { useState } from "react";
import {
  useWills,
  useCreateWill,
  useDeleteWill,
  useActivateWill,
} from "@/hooks/useWills";
import Button from "@/components/utils/Button";

export default function WillsListExample() {
  const [page, setPage] = useState(1);

  // دریافت لیست وصیت‌نامه‌ها
  const { data: willsData, isLoading, error } = useWills({ page, limit: 10 });

  // ایجاد وصیت‌نامه جدید
  const createWill = useCreateWill();

  // حذف وصیت‌نامه
  const deleteWill = useDeleteWill();

  // فعال‌سازی وصیت‌نامه
  const activateWill = useActivateWill();

  const handleCreateWill = async () => {
    await createWill.mutateAsync({
      title: "یادگار جدید",
      content: "این یک پیام آزمایشی است",
      recipients: [
        {
          name: "علی",
          phone: "09121234567",
          relation: "فرزند",
        },
      ],
    });
  };

  const handleDeleteWill = async (id: string) => {
    if (confirm("آیا مطمئن هستید؟")) {
      await deleteWill.mutateAsync({ id });
    }
  };

  const handleActivateWill = async (id: string) => {
    await activateWill.mutateAsync(id);
  };

  if (isLoading) {
    return <div className="text-center p-8">در حال بارگذاری...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        خطا در بارگذاری: {error.message}
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">لیست یادگارها</h1>
        <Button
          variant="primary"
          onClick={handleCreateWill}
          disabled={createWill.isPending}
          loading={createWill.isPending}
        >
          ایجاد یادگار جدید
        </Button>
      </div>

      <div className="space-y-4">
        {willsData?.data.data.map((will) => (
          <div
            key={will.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{will.title}</h3>
                <p className="text-gray-600 mb-2">{will.content}</p>
                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      will.status === "active"
                        ? "bg-green-100 text-green-800"
                        : will.status === "draft"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {will.status === "active"
                      ? "فعال"
                      : will.status === "draft"
                      ? "پیش‌نویس"
                      : "ارسال‌شده"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {will.recipients.length} گیرنده
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {will.status === "draft" && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleActivateWill(will.id)}
                    disabled={activateWill.isPending}
                  >
                    فعال‌سازی
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDeleteWill(will.id)}
                  disabled={deleteWill.isPending}
                >
                  حذف
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {willsData?.data.meta && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            قبلی
          </Button>
          <span className="px-4 py-2">
            صفحه {page} از {willsData.data.meta.totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === willsData.data.meta.totalPages}
          >
            بعدی
          </Button>
        </div>
      )}
    </div>
  );
}
