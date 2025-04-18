import { UpdateNewsService } from "./updateNews.service";
import { NewsRepositoryInMemory } from "../repositories/NewsRepositoryInMemory";
import { News } from "../entities/News";
import { BadRequestException, NotFoundException } from "@nestjs/common";

let updateNewsService: UpdateNewsService;
let newsRepositoryInMemory: NewsRepositoryInMemory;

describe('UpdateNewsService', () => {
    beforeEach(() => {
        newsRepositoryInMemory = new NewsRepositoryInMemory();
        updateNewsService = new UpdateNewsService(newsRepositoryInMemory);
    });

    it('Should update a news successfully', async () => {
        const news = new News({
            chapeu: 'Política',
            url: 'https://site.com/politica',
            titulo: 'Nova reforma política',
            dataHoraPublicacao: new Date(),
            imagem: 'https://site.com/imagem.jpg',
            thumbnail: 'https://site.com/thumb.jpg',
            conteudo: 'Detalhes sobre a nova reforma política...'
        });

        await newsRepositoryInMemory.create(news);

        const updated = await updateNewsService.execute(news.id, {
            titulo: 'Reforma política atualizada'
        });

        expect(updated.titulo).toBe('Reforma política atualizada');
    });

    it('Should throw NotFoundException if news does not exist', async () => {
        await expect(
            updateNewsService.execute(999, {
                titulo: 'Inexistente'
            })
        ).rejects.toThrow(NotFoundException);
    });

    it('Should throw BadRequestException for invalid input', async () => {
        const news = new News({
            chapeu: 'Economia',
            url: 'https://site.com/economia',
            titulo: 'Mercado reage',
            dataHoraPublicacao: new Date(),
            imagem: 'https://site.com/imagem.jpg',
            thumbnail: 'https://site.com/thumb.jpg',
            conteudo: 'Mercado reage à decisão do governo...'
        });

        await newsRepositoryInMemory.create(news);

        await expect(updateNewsService.execute(news.id, {
            url: 'invalid-url'
        })).rejects.toThrow(BadRequestException);
    });
});
