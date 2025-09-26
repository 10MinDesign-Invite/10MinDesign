"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@repo/better-auth/authClient";
import { registerSchema } from "@repo/zod-input-validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";


export const SignupForm = () => {
    async function signup(e: FormEvent<HTMLFormElement>) {
    const toastId = toast.loading("Signing up...");
    const router= useRouter()
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string | undefined;
      const email = formData.get("email") as string | undefined;
      const password = formData.get("password") as string | undefined;
      if (!name || !email || !password) {
        toast.dismiss(toastId);
        toast.error("please provide all values");
        return;
      }
      const validInput = registerSchema.safeParse({ email, name, password });
      if (!validInput.success) {
        toast.dismiss(toastId);
        toast.error(validInput.error.errors[0].message);
        return;
      }

   const { data, error } = await authClient.signUp.email({
        email, 
        password, 
        name, 
    }, {
        onRequest: (ctx) => {
         
        },
        onSuccess: (ctx) => {
            toast.dismiss(toastId);
            router.push("/")
        },
        onError: (ctx) => {
            toast.dismiss(toastId);
            toast.error(ctx.error.message);
        },
});
  
    
    } catch (error: any) {
      console.error(error);
      toast.dismiss(toastId);
    }
  }
  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <Card className="w-[90%] md:w-[50%] lg:w-[28%]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">SignUp</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={signup}>
            <Input placeholder="Name" name="name" />
            <Input placeholder="Email" name="email" />
            <Input placeholder="password" name="password" type="password" />
            <Button type="submit">SignUp</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <form
            className="flex flex-col gap-4"
            action={async () => {
            //  google login
            
    //            await authClient.signIn.social({
    //   provider: "google",
    //   callbackURL: "http://localhost:3000/",
    // });

            }}
          >
            <p className="text-center">OR</p>
            <Button type="submit" variant={"outline"}>
              <FcGoogle />
              Login With Google
            </Button>
          </form>
          <Link
            className="text-sm flex gap-2 mt-2 hover:text-green-600"
            href={"/login"}
          >
            <p className="text-black dark:text-white">
              Already have an account?
            </p>
            Signin
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
