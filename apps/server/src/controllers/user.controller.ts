import { db } from "@/db";
import { ratings, stores } from "@/db/schema";
import { handleError } from "@/lib/errors";
import { ratingSchema } from "@repo/common";
import { and, avg, eq, sql } from "drizzle-orm";
import type { Request, Response } from "express";

// Get all stores with ratings
export const getAllStores = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!;
    const allStores = await db
      .select({
        id: stores.id,
        name: stores.name,
        address: stores.address,
        averageRating: avg(ratings.rating),
        userRating: sql<number | null>`
        MAX(CASE WHEN ${ratings.userId} = ${userId} THEN ${ratings.rating} ELSE NULL END)
      `,
      })
      .from(stores)
      .leftJoin(ratings, eq(stores.id, ratings.storeId))
      .groupBy(stores.id);

    console.log(allStores);

    res.json({ success: true, data: { stores: allStores } });
  } catch (error) {
    handleError(error, res);
    return;
  }
};

// Update existing rating
export const updateRating = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { rating } = ratingSchema.parse(req.body);
    const { storeId } = req.params;
    const userId = req.userId!;
    const [existingRating] = await db
      .select()
      .from(ratings)
      .where(and(eq(ratings.storeId, storeId), eq(ratings.userId, userId)));

    if (existingRating) {
      const [updatedRating] = await db
        .update(ratings)
        .set({ rating })
        .where(eq(ratings.id, existingRating.id))
        .returning();

      res.send({ success: true, data: updatedRating });
      return;
    }

    const [newRating] = await db
      .insert(ratings)
      .values({ storeId, userId, rating })
      .returning();

    res.json({ success: true, data: newRating });
  } catch (error) {
    handleError(error, res);
  }
};
