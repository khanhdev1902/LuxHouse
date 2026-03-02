/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `discounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "discounts_name_key" ON "discounts"("name");
