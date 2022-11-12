-- CreateEnum
CREATE TYPE "EReponsibleType" AS ENUM ('PAI', 'MAE', 'PARENTE', 'OUTRO');

-- CreateTable
CREATE TABLE "Children" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "birthDate" VARCHAR(255) NOT NULL,
    "observations" VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "Children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsible" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "Responsible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponsiblesOnChildrens" (
    "childrenId" UUID NOT NULL,
    "responsibleId" UUID NOT NULL,
    "type" "EReponsibleType" NOT NULL,
    "assignedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResponsiblesOnChildrens_pkey" PRIMARY KEY ("childrenId","responsibleId")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "state" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255),
    "number" INTEGER,
    "complement" VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "childrenId" UUID
);

-- CreateIndex
CREATE UNIQUE INDEX "Children_id_key" ON "Children"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Responsible_id_key" ON "Responsible"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_childrenId_key" ON "Address"("childrenId");

-- AddForeignKey
ALTER TABLE "ResponsiblesOnChildrens" ADD CONSTRAINT "ResponsiblesOnChildrens_childrenId_fkey" FOREIGN KEY ("childrenId") REFERENCES "Children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponsiblesOnChildrens" ADD CONSTRAINT "ResponsiblesOnChildrens_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Responsible"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_childrenId_fkey" FOREIGN KEY ("childrenId") REFERENCES "Children"("id") ON DELETE CASCADE ON UPDATE CASCADE;
