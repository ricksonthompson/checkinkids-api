-- CreateEnum
CREATE TYPE "EStatusCult" AS ENUM ('Pendente', 'Em_Andamento', 'Finalizado');

-- CreateEnum
CREATE TYPE "EShiftCult" AS ENUM ('Matinal', 'Noturno');

-- CreateTable
CREATE TABLE "Cult" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "time" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "status" "EStatusCult" NOT NULL DEFAULT 'Pendente',
    "shift" "EShiftCult" NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "Cult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildrenOnCult" (
    "cultId" UUID NOT NULL,
    "childrenId" UUID NOT NULL,
    "isInvited" BOOLEAN NOT NULL DEFAULT false,
    "verse" BOOLEAN NOT NULL DEFAULT false,
    "attendance" BOOLEAN NOT NULL DEFAULT false,
    "meditation" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "ChildrenOnCult_pkey" PRIMARY KEY ("cultId","childrenId")
);

-- CreateTable
CREATE TABLE "Children" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "birthDate" TIMESTAMP NOT NULL,
    "observations" VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "Children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsible" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(255),
    "childrenId" UUID,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,

    CONSTRAINT "Responsible_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cult_id_key" ON "Cult"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Children_id_key" ON "Children"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Responsible_id_key" ON "Responsible"("id");

-- AddForeignKey
ALTER TABLE "ChildrenOnCult" ADD CONSTRAINT "ChildrenOnCult_cultId_fkey" FOREIGN KEY ("cultId") REFERENCES "Cult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildrenOnCult" ADD CONSTRAINT "ChildrenOnCult_childrenId_fkey" FOREIGN KEY ("childrenId") REFERENCES "Children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsible" ADD CONSTRAINT "Responsible_childrenId_fkey" FOREIGN KEY ("childrenId") REFERENCES "Children"("id") ON DELETE SET NULL ON UPDATE CASCADE;
