import { Resend } from "resend";

export const resend = new Resend(
  process.env.NODE_ENV == "production"
    ? process.env.RESEND_API_KEY
    : process.env.RESEND_API_KEY_DEV,
);
