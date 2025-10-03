import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// --- ENUM for Roles ---
export const roles = ["ADMIN", "USER", "STORE_OWNER"] as const;

// --- Users Table ---
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 60 }).notNull(), // validate min length (20) in code
  email: varchar("email", { length: 255 }).notNull().unique(),
  address: varchar("address", { length: 400 }).notNull(),

  passwordHash: varchar("password_hash", { length: 255 }).notNull(), // store hashed password
  role: varchar("role", { length: 20, enum: roles }).notNull().default("USER"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Stores Table ---
export const stores = pgTable("stores", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 60 }).notNull(),
  address: varchar("address", { length: 400 }).notNull(),

  ownerId: uuid("owner_id")
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Ratings Table ---
export const ratings = pgTable(
  "ratings",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    storeId: uuid("store_id")
      .references(() => stores.id, { onDelete: "cascade" })
      .notNull(),

    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),

    rating: integer("rating").notNull(), // enforce 1–5 in app logic
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // a user can only rate a store once
    uniqueRating: uniqueIndex("unique_rating").on(table.storeId, table.userId),
  })
);

// --- Useful Indexes ---
// export const userNameIdx = index("user_name_idx").on(users.name);
// export const userEmailIdx = index("user_email_idx").on(users.email);
// export const storeNameIdx = index("store_name_idx").on(stores.name);
