import "dotenv/config";
import { db } from "@/db";
import { users, stores, ratings } from "@/db/schema";
import { hashPassword } from "@/lib/auth";

async function main() {
  console.log("Seeding database...");

  // Clear existing data (optional, be careful in real environments)
  await db.delete(ratings);
  await db.delete(stores);
  await db.delete(users);

  // Hash password once for all users
  const password = await hashPassword("User@123");

  // Create Admins (2 admins)
  const insertedAdmins = await db
    .insert(users)
    .values([
      {
        name: "System Administrator User",
        email: "admin@example.com",
        address: "100 Admin Way, Tech City",
        passwordHash: password,
        role: "ADMIN",
      },
      {
        name: "Senior System Administrator",
        email: "admin2@example.com",
        address: "200 Admin Plaza, Tech City",
        passwordHash: password,
        role: "ADMIN",
      },
    ])
    .onConflictDoNothing()
    .returning();

  // Create Store Owners (5 store owners)

  const insertedOwners = await db
    .insert(users)
    .values([
      {
        name: "First Store Owner User Name",
        email: "owner1@example.com",
        address: "12 Baker Street, Gotham",
        passwordHash: password,
        role: "STORE_OWNER",
      },
      {
        name: "Second Store Owner Full Name",
        email: "owner2@example.com",
        address: "34 Elm Avenue, Metropolis",
        passwordHash: password,
        role: "STORE_OWNER",
      },
      {
        name: "Third Store Owner Business",
        email: "owner3@example.com",
        address: "56 Oak Street, Star City",
        passwordHash: password,
        role: "STORE_OWNER",
      },
      {
        name: "Fourth Store Owner Enterprise",
        email: "owner4@example.com",
        address: "78 Pine Avenue, Coast City",
        passwordHash: password,
        role: "STORE_OWNER",
      },
      {
        name: "Fifth Store Owner Corporation",
        email: "owner5@example.com",
        address: "90 Maple Drive, Keystone City",
        passwordHash: password,
        role: "STORE_OWNER",
      },
    ])
    .onConflictDoNothing()
    .returning();

  // Create Normal Users (8 regular users)

  const insertedUsers = await db
    .insert(users)
    .values([
      {
        name: "Regular Platform User One",
        email: "user1@example.com",
        address: "221B Baker Street, London",
        passwordHash: password,
        role: "USER",
      },
      {
        name: "Another Regular User Two",
        email: "user2@example.com",
        address: "742 Evergreen Terrace, Springfield",
        passwordHash: password,
        role: "USER",
      },
      {
        name: "Third Regular User Name",
        email: "user3@example.com",
        address: "123 Main Street, Anytown",
        passwordHash: password,
        role: "USER",
      },
      {
        name: "Fourth Platform User Name",
        email: "user4@example.com",
        address: "456 Second Avenue, Somewhere",
        passwordHash: password,
        role: "USER",
      },
      {
        name: "Fifth Application User Name",
        email: "user5@example.com",
        address: "789 Third Boulevard, Nowhere",
        passwordHash: password,
        role: "USER",
      },
      {
        name: "Sixth System User Name",
        email: "user6@example.com",
        address: "101 Fourth Street, Everywhere",
        passwordHash: password,
        role: "USER",
      },
      {
        name: "Seventh Customer User Name",
        email: "user7@example.com",
        address: "202 Fifth Avenue, Downtown",
        passwordHash: password,
        role: "USER",
      },
      {
        name: "Eighth Client User Name",
        email: "user8@example.com",
        address: "303 Sixth Street, Uptown",
        passwordHash: password,
        role: "USER",
      },
    ])
    .onConflictDoNothing()
    .returning();

  // Fetch all users to ensure we have their IDs
  const allUsers = await db.select().from(users);
  const adminUsers = allUsers.filter((u) => u.role === "ADMIN");
  const ownerUsers = allUsers.filter((u) => u.role === "STORE_OWNER");
  const regularUsers = allUsers.filter((u) => u.role === "USER");

  // Create Stores (12 stores with different owners)
  const insertedStores = await db
    .insert(stores)
    .values([
      {
        name: "Gotham Books & Cafe",
        address: "12 Baker Street, Gotham",
        ownerId: ownerUsers[0]?.id,
      },
      {
        name: "Metropolis Gadget Hub",
        address: "34 Elm Avenue, Metropolis",
        ownerId: ownerUsers[1]?.id,
      },
      {
        name: "Central City Grocers",
        address: "56 River Road, Central City",
        ownerId: ownerUsers[0]?.id,
      },
      {
        name: "Star City Electronics",
        address: "78 Tech Boulevard, Star City",
        ownerId: ownerUsers[2]?.id,
      },
      {
        name: "Coast City Fashion Store",
        address: "90 Style Avenue, Coast City",
        ownerId: ownerUsers[3]?.id,
      },
      {
        name: "Keystone Sports Equipment",
        address: "112 Athletic Street, Keystone City",
        ownerId: ownerUsers[4]?.id,
      },
      {
        name: "Gotham Pharmacy Plus",
        address: "134 Health Lane, Gotham",
        ownerId: ownerUsers[1]?.id,
      },
      {
        name: "Metropolis Home & Garden",
        address: "156 Green Street, Metropolis",
        ownerId: ownerUsers[2]?.id,
      },
      {
        name: "Central City Auto Parts",
        address: "178 Motor Avenue, Central City",
        ownerId: ownerUsers[3]?.id,
      },
      {
        name: "Star City Pet Supplies",
        address: "200 Animal Boulevard, Star City",
        ownerId: ownerUsers[4]?.id,
      },
      {
        name: "Coast City Music Store",
        address: "222 Melody Street, Coast City",
        ownerId: ownerUsers[0]?.id,
      },
      {
        name: "Keystone Bakery & Sweets",
        address: "244 Sugar Lane, Keystone City",
        ownerId: ownerUsers[1]?.id,
      },
    ])
    .onConflictDoNothing()
    .returning();

  // Fetch stores (ensure we have IDs)
  const allStores = insertedStores.length
    ? insertedStores
    : await db.select().from(stores);

  // Create Ratings (15 ratings across different stores and users)
  if (allStores.length && regularUsers.length) {
    const ratingsData = [];

    // Create diverse ratings across stores and users
    for (
      let i = 0;
      i < Math.min(15, allStores.length * regularUsers.length);
      i++
    ) {
      const storeIndex = i % allStores.length;
      const userIndex = Math.floor(i / allStores.length) % regularUsers.length;
      const rating = Math.floor(Math.random() * 5) + 1; // Random rating 1-5

      ratingsData.push({
        storeId: allStores[storeIndex].id,
        userId: regularUsers[userIndex].id,
        rating: rating,
      });
    }

    // Add some specific ratings to ensure variety
    const specificRatings = [
      { storeId: allStores[0]?.id, userId: regularUsers[0]?.id, rating: 5 },
      { storeId: allStores[0]?.id, userId: regularUsers[1]?.id, rating: 4 },
      { storeId: allStores[1]?.id, userId: regularUsers[0]?.id, rating: 3 },
      { storeId: allStores[1]?.id, userId: regularUsers[2]?.id, rating: 5 },
      { storeId: allStores[2]?.id, userId: regularUsers[1]?.id, rating: 2 },
      { storeId: allStores[2]?.id, userId: regularUsers[3]?.id, rating: 4 },
      { storeId: allStores[3]?.id, userId: regularUsers[2]?.id, rating: 5 },
      { storeId: allStores[4]?.id, userId: regularUsers[4]?.id, rating: 3 },
      { storeId: allStores[5]?.id, userId: regularUsers[5]?.id, rating: 4 },
      { storeId: allStores[6]?.id, userId: regularUsers[6]?.id, rating: 5 },
      { storeId: allStores[7]?.id, userId: regularUsers[7]?.id, rating: 2 },
      { storeId: allStores[8]?.id, userId: regularUsers[0]?.id, rating: 4 },
      { storeId: allStores[9]?.id, userId: regularUsers[1]?.id, rating: 3 },
      { storeId: allStores[10]?.id, userId: regularUsers[2]?.id, rating: 5 },
      { storeId: allStores[11]?.id, userId: regularUsers[3]?.id, rating: 4 },
    ].filter((r) => r.storeId && r.userId); // Filter out any undefined IDs

    await db.insert(ratings).values(specificRatings).onConflictDoNothing();
  }

  console.log("Seeding completed.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
