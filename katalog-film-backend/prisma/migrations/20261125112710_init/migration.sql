-- CreateTable
CREATE TABLE "film" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "sutradara" TEXT NOT NULL DEFAULT 'Tidak diketahui',
    "tahun" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "cover" TEXT,
    "sinopsis" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "film_pkey" PRIMARY KEY ("id")
);
