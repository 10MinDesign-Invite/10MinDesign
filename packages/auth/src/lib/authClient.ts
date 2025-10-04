import { customSessionClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"
import type {auth} from "./auth.js"
import { nextCookies } from "better-auth/next-js";
export const authClient = createAuthClient({
    // baseURL: `https://www.10mindesigns.shop`, 
    baseURL: `https://one0mindesignbackend-auth.onrender.com`, 
    // email otp
    plugins: [
        emailOTPClient(),
        customSessionClient<typeof auth>(),
        nextCookies()
    ]
});

