import { customSessionClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"
import type {auth} from "./auth.js"
export const authClient = createAuthClient({
    // baseURL: `https://www.10mindesigns.shop`, 
    baseURL: `https://www.10mindesigns.shop`, 
    // email otp
    plugins: [
        emailOTPClient(),
        customSessionClient<typeof auth>(),
    ]
});

