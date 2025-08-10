"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Step 1: Email schema
const emailSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
});

// Step 2: OTP schema
const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// Step 3: Reset password schema
const resetSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type EmailInput = z.infer<typeof emailSchema>;
type OtpInput = z.infer<typeof otpSchema>;
type ResetInput = z.infer<typeof resetSchema>;

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [otp, setOTP] = useState<string>("");
  const [email, setEmail] = useState("");

  // Forms for each step
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
  });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorsOtp },
  } = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
  });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: errorsReset },
  } = useForm<ResetInput>({
    resolver: zodResolver(resetSchema),
  });

  // Fake send OTP
  const onSendOtp: SubmitHandler<EmailInput> = async (data) => {
    setEmail(data.email);
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      alert(" Send OTP successfully");
      console.log("Send OTP successfully:", result.message);
      setOTP(result.otp);
      setStep("otp");
    } else {
      alert("Send OTP failed:");
      console.error("Send OTP failed:", result.message);
    }
  };

  // Fake verify OTP
  const onVerifyOtp: SubmitHandler<OtpInput> = (data) => {
    if (data.otp === otp) {
      setStep("reset");
    } else {
      alert("Invalid OTP");
    }
  };

  // Fake reset password
  const onResetPassword: SubmitHandler<ResetInput> = async (data) => {
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, newPassword: data.newPassword }),
    });
    const result = await res.json();
    if (res.ok) {
      alert(" Change password successfully");
      console.log("Change password successfully:", result.message);
      setStep("email");
      setEmail("");
    } else {
      alert("Change password failed:");
      console.error("Change password failed:", result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        {step === "email" && (
          <>
            <h2 className="text-2xl font-semibold text-center">
              Forgot Password
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Enter your email to receive an OTP code
            </p>
            <form onSubmit={handleSubmitEmail(onSendOtp)} className="space-y-4">
              <Input
                type="email"
                placeholder="you@example.com"
                {...registerEmail("email")}
                aria-invalid={!!errorsEmail.email}
                aria-describedby="email-error"
              />
              {errorsEmail.email && (
                <p className="text-red-600 text-sm" id="email-error">
                  {errorsEmail.email.message}
                </p>
              )}
              <Button className="w-full" type="submit">
                Send OTP
              </Button>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-2xl font-semibold text-center">Enter OTP</h2>
            <p className="text-center text-gray-600 mb-4">
              We sent a 6-digit code to your email: <b>{email}</b>
            </p>
            <form onSubmit={handleSubmitOtp(onVerifyOtp)} className="space-y-4">
              <Input
                type="text"
                maxLength={6}
                placeholder="Enter OTP"
                {...registerOtp("otp")}
                className="tracking-widest text-center text-xl font-mono"
                aria-invalid={!!errorsOtp.otp}
                aria-describedby="otp-error"
              />
              {errorsOtp.otp && (
                <p className="text-red-600 text-sm" id="otp-error">
                  {errorsOtp.otp.message}
                </p>
              )}
              <Button className="w-full" type="submit">
                Verify OTP
              </Button>
            </form>
          </>
        )}

        {step === "reset" && (
          <>
            <h2 className="text-2xl font-semibold text-center">
              Reset Password
            </h2>
            <form
              onSubmit={handleSubmitReset(onResetPassword)}
              className="space-y-4"
            >
              <Input
                type="password"
                placeholder="New password"
                {...registerReset("newPassword")}
                aria-invalid={!!errorsReset.newPassword}
                aria-describedby="password-error"
              />
              {errorsReset.newPassword && (
                <p className="text-red-600 text-sm" id="password-error">
                  {errorsReset.newPassword.message}
                </p>
              )}
              <Button className="w-full" type="submit">
                Reset Password
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
