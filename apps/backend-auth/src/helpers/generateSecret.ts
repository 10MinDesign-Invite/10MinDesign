import hkdf from "@panva/hkdf";
import { AUTH_SECRET, DEV_SALT, NODE_ENV, PROD_SALT } from "../env-config.js";

const AUTH_COOKIE_NAME = NODE_ENV === 'production' ? `${PROD_SALT}` : `${DEV_SALT}`;
export async function getDerivedEncryptionKey(): Promise<Uint8Array> {
  return await hkdf(
    "sha256",
    AUTH_SECRET!, // Secret key material
    AUTH_COOKIE_NAME, // Salt = session cookie name
    `Auth.js Generated Encryption Key (${AUTH_COOKIE_NAME})`, // Info string he fkt print karai use kel
    64 //  64 bytes (512 bits) for A256CBC-HS512
  );
}