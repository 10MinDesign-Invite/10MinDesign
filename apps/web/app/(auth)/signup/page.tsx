"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Lock } from "lucide-react";

// shadcn/ui components (assumes shadcn structure with components in /components/ui)
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
import Link from "next/link";
import { toast } from "react-toastify";
import { signupSchema } from "@repo/zod-input-validation";
import { useRouter } from "next/navigation";

type SignupValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupValues) {
    const id = toast.loading("wait....")
    try {
      const { data, error } = await authClient.signUp.email({
        name: values.username,
        email: values.email,
        password: values.password,
      });
      if(error) return toast.error(error.message)
      toast.success("SignUp success.....")  
      router.push("/");
    } catch (err) {
      console.error(err);
    }finally{
      toast.dismiss(id);
    }
  }

  async function handelGoogle() {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: `https://www.10mindesigns.shop/`,
    });
  }

  return (
    <div className="min-h-[100vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-1">
                <Label htmlFor="username" className="mb-2">
                  Username
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <User className="w-4 h-4 opacity-60" />
                  </span>
                  <Input
                    id="username"
                    {...register("username")}
                    placeholder="your-username"
                    className="pl-10"
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="col-span-1">
                <Label htmlFor="email" className="mb-2">
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
            </div>

            <div>
              <Label htmlFor="password" className="mb-2">
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
                  placeholder="Choose a secure password"
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <CardFooter className="flex flex-col items-center gap-3 p-0 pt-2">
              <Button type="submit" className="w-[70%]" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Sign up"}
              </Button>
            </CardFooter>
          </form>
          <div className="flex justify-center items-center w-full flex-col mt-4 gap-4">
            <Button onClick={handelGoogle} className="w-[70%]">
              <FcGoogle />
              Continue With Google
            </Button>
            <div className="w-full text-center text-sm text-muted-foreground">
              <p>
                By continuing you agree to our{" "}
                <span className="underline">Terms</span> and{" "}
                <span className="underline">Privacy Policy</span>.
              </p>
            </div>
            <div className="w-full text-center text-sm text-muted-foreground">
              <Link href={"/signin"}>
                Already Have an Account{" "}
                <span className="underline">signin</span>
              </Link>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
