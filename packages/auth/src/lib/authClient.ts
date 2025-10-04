import { customSessionClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"
import type {auth} from "./auth.js"
export const authClient = createAuthClient({
    baseURL: `https://one0mindesignbackend-auth.onrender.com`, 
    // email otp
    plugins: [
        emailOTPClient(),
        customSessionClient<typeof auth>(),

    ]
});

export {toNextJsHandler} from "better-auth/next-js"