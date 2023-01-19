-- DropForeignKey
ALTER TABLE "Responsible" DROP CONSTRAINT "Responsible_childrenId_fkey";

-- AlterTable
ALTER TABLE "Responsible" ALTER COLUMN "childrenId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Responsible" ADD CONSTRAINT "Responsible_childrenId_fkey" FOREIGN KEY ("childrenId") REFERENCES "Children"("id") ON DELETE SET NULL ON UPDATE CASCADE;
