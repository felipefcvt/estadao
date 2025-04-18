import {News} from "../../../../modules/news/entities/News";

export class PrismaNewsMappers {
    static toPrisma(news: News) {
        return {
            chapeu: news.chapeu,
            url: news.url,
            titulo: news.titulo,
            dataHoraPublicacao: news.dataHoraPublicacao,
            imagem: news.imagem,
            thumbnail: news.thumbnail,
            conteudo: news.conteudo,
            updatedAt: news.updatedAt,
        }
    }

    static toDomain(news: News) {
        return new News({
            chapeu: news.chapeu,
            url: news.url,
            titulo: news.titulo,
            dataHoraPublicacao: news.dataHoraPublicacao,
            imagem: news.imagem,
            thumbnail: news.thumbnail,
            conteudo: news.conteudo,
        }, news.id);
    }
}