import { toNextJsHandler, auth } from "@repo/auth/auth";


export const { POST, GET } = toNextJsHandler(auth);