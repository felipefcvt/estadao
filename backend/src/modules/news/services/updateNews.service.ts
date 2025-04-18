import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { NewsRepository } from "../repositories/NewsRepository";
import { News } from "../entities/News";
import { updateNewsSchema } from "../dto/updateNewsDTO";

@Injectable()
export class UpdateNewsService {
    constructor(private newsRepository: NewsRepository) {}

    async execute(id: number, input: any): Promise<News> {
        const result = updateNewsSchema.safeParse(input);

        if (!result.success) {
            const errorMessages = result.error.errors.map(err => err.message).join('; ');
            throw new BadRequestException(`Erro de validação: ${errorMessages}`);
        }

        const data = result.data;

        const existing = await this.newsRepository.getNewsById(id);

        if (!existing) {
            throw new NotFoundException(`News with id ${id} not found`);
        }

        const updated = new News({
            chapeu: data.chapeu ?? existing.chapeu,
            url: data.url ?? existing.url,
            titulo: data.titulo ?? existing.titulo,
            dataHoraPublicacao: data.dataHoraPublicacao ?? existing.dataHoraPublicacao,
            imagem: data.imagem ?? existing.imagem,
            thumbnail: data.thumbnail ?? existing.thumbnail,
            conteudo: data.conteudo ?? existing.conteudo,
        }, id);

        return this.newsRepository.update(id, updated);
    }
}
