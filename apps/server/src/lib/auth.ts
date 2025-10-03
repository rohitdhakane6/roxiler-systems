import { Errors } from "@/lib/errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// --- Hash a plain password ---
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// --- Compare plain password with hash ---
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// --- Generate JWT token ---
export function generateToken(payload: {
  userId: string;
  role: string;
}): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

// --- Verify JWT token ---
export function verifyToken(token: string): { userId: string; role: string } {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  } catch {
    throw Errors.UNAUTHORIZED;
  }
}
