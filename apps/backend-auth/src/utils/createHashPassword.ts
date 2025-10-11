import crypto from "crypto";

export async function createHashPassword(password: string, salt: string) {
  const hashPassword = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hashPassword };
}
