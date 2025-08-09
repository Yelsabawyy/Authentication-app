'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <div>
          <label className="block mb-1 font-medium" htmlFor="username">
            Username
          </label>
          <Input id="username" type="text" placeholder="Your username" />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="password">
            Password
          </label>
          <Input id="password" type="password" placeholder="********" />
        </div>

        <Button type="submit" className="w-full">
          Sign Up
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

        {/* Login link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/auth/Login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
