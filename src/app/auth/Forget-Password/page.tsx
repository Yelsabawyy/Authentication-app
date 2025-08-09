"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Fake send OTP
  function sendOtp() {
    if (!email) return alert("Enter your email");
    alert(`OTP sent to ${email}`); // replace with real API call
    setStep("otp");
  }

  // Fake verify OTP
  function verifyOtp() {
    if (otp === "123456") {
      setStep("reset");
    } else {
      alert("Invalid OTP");
    }
  }

  // Fake reset password
  function resetPassword() {
    if (!newPassword) return alert("Enter new password");
    alert("Password reset successfully!"); // replace with real API call
    // redirect or reset form here
    setStep("email");
    setEmail("");
    setOtp("");
    setNewPassword("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        {step === "email" && (
          <>
            <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>
            <p className="text-center text-gray-600 mb-4">
              Enter your email to receive an OTP code
            </p>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="w-full" onClick={sendOtp}>
              Send OTP
            </Button>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-2xl font-semibold text-center">Enter OTP</h2>
            <p className="text-center text-gray-600 mb-4">
              We sent a 6-digit code to your email: <b>{email}</b>
            </p>
            <Input
              type="text"
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="tracking-widest text-center text-xl font-mono"
            />
            <Button className="w-full" onClick={verifyOtp}>
              Verify OTP
            </Button>
          </>
        )}

        {step === "reset" && (
          <>
            <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button className="w-full" onClick={resetPassword}>
              Reset Password
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
