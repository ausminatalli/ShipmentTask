import * as crypto from "crypto";

export function generateEmailToken() {
  const tokenLength = 64;
  return crypto.randomBytes(tokenLength).toString("hex");
}
