/*
  Warnings:

  - Added the required column `poster_path` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Made the column `poster_path` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "poster_path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "poster_path" SET NOT NULL;
