import crypto from "crypto";

export async function generateSessionId() {
  const sessionId = crypto.randomBytes(256).toString("hex");
  return sessionId;
}
