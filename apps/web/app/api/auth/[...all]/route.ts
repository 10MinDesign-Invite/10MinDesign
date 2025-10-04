import { toNextJsHandler } from "@repo/auth/authClient";
import { auth } from "@repo/auth/auth";

export const { GET, POST } = toNextJsHandler(auth.handler);
