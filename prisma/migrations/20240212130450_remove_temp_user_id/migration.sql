/*
  Warnings:

  - You are about to drop the column `temp_user_id` on the `cart` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "item_id" TEXT,
    "count" INTEGER NOT NULL DEFAULT 0,
    "img_url" TEXT,
    "title" TEXT,
    "description" TEXT,
    "rating" REAL,
    "reviews" INTEGER,
    "price" REAL NOT NULL,
    "author" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'RUB',
    "delivery" TEXT,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_cart" ("author", "count", "currency", "delivery", "description", "id", "img_url", "item_id", "price", "rating", "reviews", "title", "updated_at", "user_id") SELECT "author", "count", "currency", "delivery", "description", "id", "img_url", "item_id", "price", "rating", "reviews", "title", "updated_at", "user_id" FROM "cart";
DROP TABLE "cart";
ALTER TABLE "new_cart" RENAME TO "cart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
