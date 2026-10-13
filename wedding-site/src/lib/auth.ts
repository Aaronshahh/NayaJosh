import { createHmac, timingSafeEqual } from "crypto";
import type { AccessRole } from "./events";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

type TokenPayload = {
  role: AccessRole;
  exp: number;
};

function authSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return secret;
}

function sign(payloadB64: string) {
  return createHmac("sha256", authSecret()).update(payloadB64).digest("base64url");
}

export function resolvePasswordRole(password: string): AccessRole | null {
  const normalized = password.trim();
  const full = (process.env.PASSWORD_FULL ?? "nandj").trim();
  const wedding = (process.env.PASSWORD_WEDDING ?? "nj2027").trim();
  const admin = (process.env.PASSWORD_ADMIN ?? "admin").trim();

  if (normalized === full) return "full";
  if (normalized === wedding) return "wedding";
  if (normalized === admin) return "admin";
  return null;
}

export function createSessionToken(role: AccessRole): string {
  const payload: TokenPayload = {
    role,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${payloadB64}.${sign(payloadB64)}`;
}

export function verifySessionToken(token: string | null | undefined): AccessRole | null {
  if (!token) return null;
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  const expected = sign(payloadB64);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8")) as TokenPayload;
    if (!payload?.role || !payload?.exp || Date.now() > payload.exp) return null;
    if (payload.role !== "full" && payload.role !== "wedding" && payload.role !== "admin") return null;
    return payload.role;
  } catch {
    return null;
  }
}

export function getBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length).trim() || null;
}
