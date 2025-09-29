import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_Backend_URL as string, 
});

export {toNextJsHandler} from "better-auth/next-js"