import { customSessionClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"
import type {auth} from "./auth.js"
console.log(process.env.NEXT_PUBLIC_Backend_URL,"authClient=====")
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_Backend_URL as string, 
    // email otp
    plugins: [
        emailOTPClient(),
        customSessionClient<typeof auth>(),

    ]
});

export {toNextJsHandler} from "better-auth/next-js"