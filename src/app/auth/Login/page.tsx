"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// Define Zod schema for login
const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function Login() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    console.log("Login Data:", data);
    // handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        noValidate
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...form.register("email")}
            aria-invalid={!!form.formState.errors.email}
            aria-describedby="email-error"
          />
          {form.formState.errors.email && (
            <p className="text-red-600 mt-1 text-sm" id="email-error">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...form.register("password")}
            aria-invalid={!!form.formState.errors.password}
            aria-describedby="password-error"
          />
          {form.formState.errors.password && (
            <p className="text-red-600 mt-1 text-sm" id="password-error">
              {form.formState.errors.password.message}
            </p>
          )}
          {/* Forgot password link */}
          <div className="text-right mt-1">
            <Link
              href="/auth/Forget-Password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Submit button */}
        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <span className="h-px w-12 bg-gray-300"></span>
          <span>Or continue with</span>
          <span className="h-px w-12 bg-gray-300"></span>
        </div>

        {/* Social buttons */}
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center space-x-2"
            type="button"
            onClick={() => alert("Login with Google")}
          >
            <FcGoogle className="w-5 h-5" />
            <span>Google</span>
          </Button>

          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center space-x-2"
            type="button"
            onClick={() => alert("Login with GitHub")}
          >
            <FaGithub className="w-5 h-5" />
            <span>GitHub</span>
          </Button>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {`Don't have an account? `}
          <Link href="/auth/Register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
