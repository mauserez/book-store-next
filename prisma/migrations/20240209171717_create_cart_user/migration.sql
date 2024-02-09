-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "cart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "temp_user_id" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
