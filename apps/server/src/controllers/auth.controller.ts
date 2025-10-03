import type { Request, Response } from "express";
import { db } from "@/db";
import { users } from "@/db/schema";
import { comparePassword, generateToken, hashPassword } from "@/lib/auth";
import { AppError, handleError } from "@/lib/errors";
import { loginSchema, signupSchema, updatePasswordSchema } from "@repo/common";
import { eq } from "drizzle-orm";

// Register new user (only USER role)
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, address, password } = signupSchema.parse(req.body);
    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existing)
      throw new AppError({
        message: "Email already exists",
        statusCode: 409,
      });
    const passwordHash = await hashPassword(password);
    const [user] = await db
      .insert(users)
      .values({ name, email, address, passwordHash, role: "USER" })
      .returning();

    const token = generateToken({ userId: user.id, role: user.role });

    res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, name: user.name, role: user.role },
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Login for all users
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user)
      throw new AppError({
        message: "Invalid credentials",
        statusCode: 401,
      });

    const match = await comparePassword(password, user.passwordHash);
    if (!match)
      throw new AppError({
        message: "Invalid credentials",
        statusCode: 401,
      });
    const token = generateToken({ userId: user.id, role: user.role });

    res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, name: user.name, role: user.role },
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!;
    const { currentPassword, newPassword } = updatePasswordSchema.parse(
      req.body
    );
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user)
      throw new AppError({ message: "User not found", statusCode: 404 });

    const match = await comparePassword(currentPassword, user.passwordHash);
    if (!match)
      throw new AppError({
        message: "Current password is incorrect",
        statusCode: 401,
      });

    const newPasswordHash = await hashPassword(newPassword);
    await db
      .update(users)
      .set({ passwordHash: newPasswordHash })
      .where(eq(users.id, userId));

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    handleError(error, res);
  }
};
