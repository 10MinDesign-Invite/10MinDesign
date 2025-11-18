import { Resend } from "resend";
import { NODE_ENV, RESEND_API_KEY, RESEND_API_KEY_DEV } from "../env-config";

export const resend = new Resend(
  NODE_ENV == "production"
    ? RESEND_API_KEY
    : RESEND_API_KEY_DEV,
);
