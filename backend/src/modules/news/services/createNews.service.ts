import { BadRequestException, Injectable } from "@nestjs/common";
import {NewsRepository} from "../repositories/NewsRepository";
import {createNewsSchema} from "../dto/createNewsDTO";
import {News} from "../entities/News";

@Injectable()
export class CreateNewsService {
    constructor(private newsRepository: NewsRepository) {}

    async execute(input: any)  {
        const result = await createNewsSchema.safeParse(input);

        if (!result.success) {
            const errorMessages = result.error.errors.map(err => err.message).join('; ');
            throw new BadRequestException(`Erro de validação: ${errorMessages}`);
        }

        const { chapeu, url, titulo, dataHoraPublicacao, imagem, thumbnail, conteudo } = result.data;

        const nowInBrasilia = new Date();
        nowInBrasilia.setHours(nowInBrasilia.getHours() - 3);

        const news = new News({
            chapeu,
            url,
            titulo,
            dataHoraPublicacao: nowInBrasilia,
            imagem,
            thumbnail,
            conteudo,
        })

        const created = await this.newsRepository.create(news);
        return created;
    }
}