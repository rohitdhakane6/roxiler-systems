import { db } from "@/db";
import { ratings, stores, users } from "@/db/schema";
import { hashPassword } from "@/lib/auth";
import { AppError, handleError } from "@/lib/errors";
import { adminAddStore, adminAddUser } from "@repo/common";
import { avg, count, eq } from "drizzle-orm";
import type { Request, Response } from "express";

export const getDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [[{ userCount }], [{ storeCount }], [{ ratingCount }]] =
      await Promise.all([
        db.select({ userCount: count(users.id) }).from(users),
        db.select({ storeCount: count(stores.id) }).from(stores),
        db.select({ ratingCount: count(ratings.id) }).from(ratings),
      ]);

    res.json({
      success: true,
      data: {
        totalUsers: userCount,
        totalStores: storeCount,
        totalRatings: ratingCount,
      },
    });
  } catch (error) {
    handleError(error, res);
    return;
  }
};

// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        address: users.address,
        role: users.role,
      })
      .from(users);
    res.json({ success: true, data: { users: allUsers } });
  } catch (error) {
    handleError(error, res);
    return;
  }
};

// Create new user (can be ADMIN, USER, or STORE_OWNER)
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, address, password, role } = adminAddUser.parse(
      req.body
    );
    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existing) {
      throw new AppError({
        message: "Email already exists",
        statusCode: 409,
      });
    }

    const passwordHash = await hashPassword(password);
    const [user] = await db
      .insert(users)
      .values({ name, email, address, passwordHash, role })
      .returning();

    res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, role: user.role },
      },
    });
  } catch (error) {
    handleError(error, res);
    return;
  }
};

// Get all stores
export const getAllStores = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allStores = await db
      .select({
        id: stores.id,
        name: stores.name,
        address: stores.address,
        averageRating: avg(ratings.rating),
        ownerId: stores.ownerId,
      })
      .from(stores)
      .leftJoin(ratings, eq(stores.id, ratings.storeId))
      .groupBy(stores.id);

    res.json({ success: true, data: { stores: allStores } });
  } catch (error) {
    handleError(error, res);
    return;
  }
};

// Create new store
export const createStore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, address, ownerEmailId } = adminAddStore.parse(req.body);

    const [owner] = await db
      .select()
      .from(users)
      .where(eq(users.email, ownerEmailId));

    if (!owner) {
      throw new AppError({
        message: "Owner not found",
        statusCode: 404,
      });
    }

    if (owner.role !== "STORE_OWNER") {
      throw new AppError({
        message: "Email is not a store owner",
        statusCode: 400,
      });
    }

    const [existingStore] = await db
      .select()
      .from(stores)
      .where(eq(stores.ownerId, owner.id));

    if (existingStore) {
      throw new AppError({
        message: "Owner already has a store",
        statusCode: 400,
      });
    }

    const [createdStore] = await db
      .insert(stores)
      .values({ name, address, ownerId: owner.id })
      .returning();

    res.json({
      success: true,
      data: { store: createdStore },
    });
  } catch (error) {
    handleError(error, res);
    return;
  }
};
