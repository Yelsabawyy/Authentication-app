
'use client'
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to AuthApp</h1>

      <div className="max-w-md text-center space-y-2 mb-8 text-gray-700">
        <p>Simple user registration with email and password.</p>
        <p>Secure login with social providers like Google and GitHub.</p>
        <p>Full password reset and email verification implemented.</p>
      </div>

      <button
        onClick={() => router.push("/auth/Register")}
        className="px-6 py-2 bg-black cursor-pointer  text-white rounded-sm transition"
      >
        Try It Now
      </button>
    </main>
  );
}
