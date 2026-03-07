/*
  Warnings:

  - You are about to drop the column `discountedAmount` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `originalPrice` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `totalDiscountedAmount` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "discountedAmount",
DROP COLUMN "originalPrice",
ADD COLUMN     "totalDiscountedAmount" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "unitPrice" DECIMAL(12,2) NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "totalAmount" DECIMAL(12,2) NOT NULL;
