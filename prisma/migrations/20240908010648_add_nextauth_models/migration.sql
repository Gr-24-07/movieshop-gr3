/*
  Warnings:

  - You are about to drop the column `name` on the `CartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "name",
ADD COLUMN     "poster_path" TEXT;
