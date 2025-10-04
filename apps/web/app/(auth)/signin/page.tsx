"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@repo/auth/authClient";
import { FcGoogle } from "react-icons/fc";
import { signinSchema } from "@repo/zod-input-validation";
import Link from "next/link";
import { IoLockClosed } from "react-icons/io5";
import { toast } from "react-toastify";

type SignupValues = z.infer<typeof signinSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupValues) {
    const id = toast.loading("wait...");
    try {
      const {error} = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },{
        onSuccess(){
          toast.success("success...")
        }
      });
    } catch (err) {
      console.error(err);
    }finally{
      toast.dismiss(id);
    }
  }

  async function handelGoogle() {
    const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "https://www.10mindesigns.shop/"
  });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Sign in to your account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-1 block">
                Email
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail className="w-4 h-4 opacity-60" />
                </span>
                <Input
                  id="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="mb-1 block">
                Password
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock className="w-4 h-4 opacity-60" />
                </span>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Your secure password"
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <CardFooter className="flex flex-col gap-3 px-0 pt-2">
              <Button
                type="submit"
                className="w-full sm:w-[70%] mx-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </CardFooter>
          </form>

          <div className="flex flex-col items-center mt-5 gap-3">
            <Button
              onClick={handelGoogle}
              variant="outline"
              className="w-full sm:w-[70%] flex gap-2 justify-center"
            >
              <FcGoogle className="text-lg" />
              Continue With Google
            </Button>

            <p className="w-full text-center text-xs sm:text-sm text-muted-foreground mt-2">
              By continuing you agree to our{" "}
              <span className="underline">Terms</span> and{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
            <div className="w-full text-center text-sm text-muted-foreground">
              <Link href={"/signup"}>
                Don't Have an Account <span className="underline">signup</span>
              </Link>
            </div>
            <div className="w-full flex justify-center items-center text-sm">
              <Link className="flex justify-center items-center gap-3" href={"/forgot"}>
                Forgot Password <span className="underline"><IoLockClosed size={20} color="red" /></span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
