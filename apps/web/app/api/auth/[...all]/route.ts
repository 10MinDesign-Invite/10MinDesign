import { toNextJsHandler } from "@repo/auth/authClient";
import { auth } from "@repo/auth/auth";

export const { POST, GET } = toNextJsHandler(auth);