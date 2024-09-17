-- CreateTable
CREATE TABLE "Cards" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Info" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);
