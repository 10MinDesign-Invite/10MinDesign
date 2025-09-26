"use client"

import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { authClient } from "@repo/better-auth/authClient"


export function LoginForm() {
    const router = useRouter();

    return (
        <form action={async (formData): Promise<any> => {

            const toastId = toast.loading("Please wait...")
            try {
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                if (!email) toast.error("provide email")
                if (!password) toast.error("provide password")
               const { error } = await authClient.signIn.email({
                         email,
                         password,
                         callbackURL: "/",
                     });
            } catch (error) {
                toast.dismiss(toastId)
                console.log(error)
            }

        }
        } className="flex flex-col gap-4" >
            <Input placeholder="Email" name="email" />
            <Input placeholder="password" name="password" type="password" />
            <Button type="submit">Login</Button>
        </form>
    )
}