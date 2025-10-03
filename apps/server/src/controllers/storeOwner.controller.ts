import { db } from "@/db";
import type { Request, Response } from "express";
import { stores, ratings } from "@/db/schema";
import { avg, count, eq } from "drizzle-orm";
import { handleError } from "@/lib/errors";
import { storeCreateSchema } from "../lib/validators";

// Create a new store
export const createStore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ownerId = req.userId!;
    const { name, address } = storeCreateSchema.parse(req.body);

    // Check if the user already has a store
    const [existingStore] = await db
      .select()
      .from(stores)
      .where(eq(stores.ownerId, ownerId));

    if (existingStore) {
      res.status(400).json({ message: "User already owns a store" });
      return;
    }

    const [newStore] = await db
      .insert(stores)
      .values({ name, address, ownerId })
      .returning();

    res.status(201).json({ success: true, data: newStore });
  } catch (error) {
    handleError(error, res);
  }
};

// Get own store details with average rating
export const getMyStore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ownerId = req.userId!;
    const [store] = await db
      .select({
        id: stores.id,
        name: stores.name,
        address: stores.address,
        averageRating: avg(ratings.rating),
        totalRatings: count(ratings.id),
      })
      .from(stores)
      .leftJoin(ratings, eq(stores.id, ratings.storeId))
      .where(eq(stores.ownerId, ownerId))
      .groupBy(stores.id);

    if (!store) {
      res.status(404).json({ message: "Store not found" });
      return;
    }

    res.json({ success: true, data: store });
  } catch (error) {
    handleError(error, res);
  }
};

// Get all ratings for own store with user info
export const getMyStoreRatings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ownerId = req.userId!;
    const [store] = await db
      .select()
      .from(stores)
      .where(eq(stores.ownerId, ownerId));
    if (!store) {
      res.status(404).json({ message: "Store not found" });
      return;
    }

    const storeRatings = await db
      .select({
        id: ratings.id,
        rating: ratings.rating,
        userId: ratings.userId,
        createdAt: ratings.createdAt,
        updatedAt: ratings.updatedAt,
      })
      .from(ratings)
      .where(eq(ratings.storeId, store.id))
      .orderBy(ratings.rating);

    res.json({ success: true, data: storeRatings });
  } catch (error) {
    handleError(error, res);
  }
};
