-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOME', 'OFFICE', 'OTHER');

-- AlterTable
ALTER TABLE "user_addresses" ADD COLUMN     "addressType" "AddressType" NOT NULL DEFAULT 'HOME';
