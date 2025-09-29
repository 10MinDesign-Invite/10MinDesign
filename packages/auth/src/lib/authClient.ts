import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_Backend_URL as string, 
    // email otp
    plugins: [
        emailOTPClient()
    ]
});

export {toNextJsHandler} from "better-auth/next-js"