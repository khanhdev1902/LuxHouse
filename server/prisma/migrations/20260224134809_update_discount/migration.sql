/*
  Warnings:

  - You are about to drop the column `isPercentage` on the `discounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `discounts` DROP COLUMN `isPercentage`,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `type` VARCHAR(191) NOT NULL DEFAULT 'percentage';
