"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_Backend_URL}/auth/signupuser`,
        data,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Account created successfully!");
        router.push("/");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-10">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-black border border-neutral-700 shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">
            Signup
          </CardTitle>
          <p className="mt-1 text-sm text-neutral-400">
            Create your account to get started
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label className="text-sm text-white">Name</Label>
                <Input
                  name="name"
                  placeholder="Your full name"
                  className="mt-1 bg-neutral-900 text-white placeholder:text-neutral-500 rounded-md"
                  required
                />
              </div>

              <div>
                <Label className="text-sm text-white">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 bg-neutral-900 text-white placeholder:text-neutral-500 rounded-md"
                  required
                />
              </div>

              <div>
                <Label className="text-sm text-white">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  className="mt-1 bg-neutral-900 text-white placeholder:text-neutral-500 rounded-md"
                  required
                />
              </div>

              <p className="text-sm text-neutral-400 text-center">
                By continuing you agree to our{" "}
                <a className="underline text-white" href="#">
                  Privacy Policy
                </a>
                .
              </p>

              <Button
                type="submit"
                className={`w-full ${loading ? "bg-neutral-700 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"} text-white font-bold rounded-lg py-2 transition`}
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="flex items-center gap-2">
              <Separator className="flex-1 bg-neutral-700" />
              <span className="text-sm text-neutral-400">or continue with</span>
              <Separator className="flex-1 bg-neutral-700" />
            </div>

            <Link href={`${process.env.NEXT_PUBLIC_Backend_URL}/google`}>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg py-2 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-6 w-6"
                  aria-hidden
                >
                  <path
                    fill="#EA4335"
                    d="M24 11.5c3.6 0 6.2 1.6 7.6 2.9l5.7-5.6C34.2 5.1 29.5 3 24 3 14 3 5.9 8.9 2.6 17.3l6.8 5.3C11.6 15.2 17.2 11.5 24 11.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.5 24.5c0-1.6-.1-2.8-.3-4H24v8h12.7c-.6 3.2-2.6 5.7-5.6 7.4l6.8 5.3C43.6 37.6 46.5 31.4 46.5 24.5z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M9.4 29.9A14.6 14.6 0 0 1 8 24.5c0-1.9.4-3.7 1.1-5.3L2.6 13C.9 16.2 0 19.9 0 24.5c0 4.6.9 8.3 2.6 11.5l6.8-5.3z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M24 46c5.5 0 10.2-1.8 13.7-4.9l-6.8-5.3c-2 1.4-4.6 2.3-6.9 2.3-6.8 0-12.4-3.7-15-9.2L2.6 34.5C5.9 42.1 14 48 24 48z"
                  />
                </svg>
                Continue with Google
              </Button>
            </Link>
            <p className="text-sm text-center text-neutral-400 mt-4">
              Already have an account?{" "}
              <Link href="/signin" className="underline text-white">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-neutral-500 mt-6 text-sm">
        start your creation journey today!
      </p>
    </div>
  );
}
