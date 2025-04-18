-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "chapeu" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "dataHoraPublicacao" TIMESTAMP(3) NOT NULL,
    "imagem" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
