import { z } from "zod";

export const roles = ["ADMIN", "USER", "STORE_OWNER"] as const;
export type Role = (typeof roles)[number];

export const signupSchema = z.object({
  name: z.string().min(2, "Name too short").max(60, "Name too long"),
  email: z.email("Invalid email"),
  address: z.string().max(400, "Address too long"),
  password: z
    .string()
    .min(8, "Password too short")
    .max(16, "Password too long")
    .regex(/^(?=.*[A-Z])/, "Need uppercase")
    .regex(/^(?=.*[^A-Za-z0-9])/, "Need special char"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, "Required"),
});

export const storeCreateSchema = z.object({
  name: z.string().min(1, "Required").max(60, "Name too long"),
  address: z.string().max(400, "Address too long"),
  ownerId: z.uuid("Invalid UUID").optional(),
});

export const adminAddUser = z.object({
  name: z.string().min(2, "Name too short").max(60, "Name too long"),
  email: z.email("Invalid email"),
  address: z.string().max(400, "Address too long"),
  password: z
    .string()
    .min(8, "Password too short")
    .max(16, "Password too long")
    .regex(/^(?=.*[A-Z])/, "Need uppercase")
    .regex(/^(?=.*[^A-Za-z0-9])/, "Need special char"),
  role: z.enum(roles, { message: "Invalid role" }),
});

export const adminAddStore = z.object({
  name: z.string().min(1, "Required").max(60, "Name too long"),
  address: z.string().max(400, "Address too long"),
  ownerEmailId: z.email(),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Required"),
  newPassword: z
    .string()
    .min(8, "Password too short")
    .max(16, "Password too long")
    .regex(/^(?=.*[A-Z])/, "Need uppercase")
    .regex(/^(?=.*[^A-Za-z0-9])/, "Need special char"),
});

export const ratingSchema = z.object({
  rating: z.coerce
    .number()
    .int("Must be integer")
    .min(1, "Min 1")
    .max(5, "Max 5"),
});

export const storeSearchSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AdminAddUserInput = z.infer<typeof adminAddUser>;
export type AdminAddStoreInput = z.infer<typeof adminAddStore>;
export type StoreCreateInput = z.infer<typeof storeCreateSchema>;
