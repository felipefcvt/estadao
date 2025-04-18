import {News} from "../entities/News";

export class NewsViewModel {
    static toHttp({ id, chapeu, url, titulo, dataHoraPublicacao, imagem, thumbnail, conteudo }: News) {
        return {
            id,
            chapeu,
            url,
            titulo,
            dataHoraPublicacao,
            imagem,
            thumbnail,
            conteudo,
        }
    }
}