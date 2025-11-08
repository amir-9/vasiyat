// app/login/page.tsx
"use client";

import { useState } from "react";
import Button from "@/components/utils/Button";
import FloatingInput from "@/components/utils/FloatingInput";
import { useCheckUser, useSignup, useVerifyOtp } from "@/hooks/useAuth";
import {
  phoneSchema,
  nameSchema,
  familySchema,
  otpSchema,
} from "./loginSchemas";
import { getErrorMessage } from "@/utils/error-handler";

type Step = "check" | "otp";
type Errors = { phone?: string; name?: string; family?: string; otp?: string };

const LoginPage = () => {
  // States
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<Step>("check");
  const [hasAccount, setHasAccount] = useState<null | boolean>(null);
  const [errors, setErrors] = useState<Errors>({});

  // Mutations
  const checkUserMutation = useCheckUser();
  const signupMutation = useSignup();
  const verifyOtpMutation = useVerifyOtp();

  // ✅ Step 1: Check if user exists
  const handleCheckUser = async () => {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      setErrors({ phone: result.error.issues[0].message });
      return;
    }

    setErrors({});

    try {
      const response = await checkUserMutation.mutateAsync({ phone });
      setHasAccount(response.data.userExists);
      setStep(response.data.userExists ? "otp" : "check");
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "خطا در بررسی کاربر");

      setErrors({ phone: errorMessage });
    }
  };

  // ✅ Step 2: Send OTP for new user
  const handleSendOtp = async () => {
    const nameCheck = nameSchema.safeParse(name);
    const familyCheck = familySchema.safeParse(family);
    const newErrors: Errors = {};

    if (!nameCheck.success) newErrors.name = nameCheck.error.issues[0].message;
    if (!familyCheck.success)
      newErrors.family = familyCheck.error.issues[0].message;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await signupMutation.mutateAsync({ phone, name, family });
      setStep("otp");
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "خطا در ارسال کد");

      setErrors({ name: errorMessage });
    }
  };

  // ✅ Step 3: Verify OTP
  const handleVerifyOtp = async () => {
    const otpCheck = otpSchema.safeParse(otp);
    if (!otpCheck.success) {
      setErrors({ otp: otpCheck.error.issues[0].message });
      return;
    }

    setErrors({});

    try {
      await verifyOtpMutation.mutateAsync({ phone, otp });
      // هدایت به داشبورد توسط هوک انجام می‌شود
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "کد تایید اشتباه است");

      setErrors({ otp: errorMessage });
    }
  };

  const loading =
    checkUserMutation.isPending ||
    signupMutation.isPending ||
    verifyOtpMutation.isPending;

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-[#1e77ae] to-[#373787] px-4">
      <div className="bg-black/10 shadow-lg rounded-2xl p-10 w-full max-w-lg min-h-[300px] text-center">
        <h2 className="text-4xl font-semibold text-white mb-16">
          ورود / ثبت‌نام
        </h2>

        {/* Step 1: Phone */}
        {hasAccount === null && (
          <>
            <FloatingInput
              id="phone"
              label="شماره موبایل"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            />
            <Button
              variant="white"
              size="lg"
              onClick={handleCheckUser}
              disabled={loading}
              loading={loading}
              className="w-full"
            >
              ادامه
            </Button>
          </>
        )}

        {/* Step 2: New User Info */}
        {hasAccount === false && step === "check" && (
          <>
            <FloatingInput
              id="name"
              label="نام"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <FloatingInput
              id="family"
              label="نام خانوادگی"
              type="text"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              error={errors.family}
            />
            <Button
              variant="white"
              size="lg"
              onClick={handleSendOtp}
              disabled={loading}
              loading={loading}
              className="w-full"
            >
              دریافت کد ورود
            </Button>
          </>
        )}

        {/* Step 3: OTP */}
        {(hasAccount === true || step === "otp") && (
          <>
            <FloatingInput
              id="otp"
              label="کد تأیید"
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              error={errors.otp}
            />
            <Button
              variant="white"
              size="lg"
              onClick={handleVerifyOtp}
              disabled={loading}
              loading={loading}
              className="w-full"
            >
              ورود به حساب
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
