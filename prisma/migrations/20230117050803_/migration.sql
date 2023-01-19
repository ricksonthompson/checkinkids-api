/*
  Warnings:

  - Added the required column `shift` to the `Cult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Cult` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Cult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EShiftCult" AS ENUM ('MATINAL', 'NOTURNO');

-- AlterTable
ALTER TABLE "ChildrenOnCult" ADD COLUMN     "isInvited" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Cult" ADD COLUMN     "shift" "EShiftCult" NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP NOT NULL;

-- DropEnum
DROP TYPE "ETypeCult";
