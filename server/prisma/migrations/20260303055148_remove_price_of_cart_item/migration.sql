/*
  Warnings:

  - You are about to drop the column `price` on the `cart_items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartId,productVariantId]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "price";

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cartId_productVariantId_key" ON "cart_items"("cartId", "productVariantId");
