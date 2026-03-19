/*
  Warnings:

  - You are about to drop the column `address` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `user_addresses` table. All the data in the column will be lost.
  - Added the required column `district` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ward` to the `user_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_addresses" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "state",
DROP COLUMN "zipCode",
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL,
ADD COLUMN     "ward" TEXT NOT NULL;
