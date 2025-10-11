import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: `https://api.10mindesigns.shop`,
    fetchOptions:{
        credentials:"include"
    }
});