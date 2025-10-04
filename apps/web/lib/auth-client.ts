import { createAuthClient } from "better-auth/react" // make sure to import from better-auth/react

export const authClient =  createAuthClient({
    baseURL: "https://www.10mindesigns.shop"
})