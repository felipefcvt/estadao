import { DeleteNewsService } from "./deleteNews.service";
import { NewsRepositoryInMemory } from "../repositories/NewsRepositoryInMemory";
import { News } from "../entities/News";
import { NotFoundException } from "@nestjs/common";

let deleteNewsService: DeleteNewsService;
let newsRepositoryInMemory: NewsRepositoryInMemory;

describe('DeleteNewsService', () => {
    beforeEach(() => {
        newsRepositoryInMemory = new NewsRepositoryInMemory();
        deleteNewsService = new DeleteNewsService(newsRepositoryInMemory);
    });

    it('Should delete a news successfully', async () => {
        const news = new News({
            chapeu: 'Esportes',
            url: 'https://site.com/esportes',
            titulo: 'Final do campeonato',
            dataHoraPublicacao: new Date(),
            imagem: 'https://site.com/img.jpg',
            thumbnail: 'https://site.com/thumb.jpg',
            conteudo: 'O time venceu na final...'
        });

        await newsRepositoryInMemory.create(news);

        await deleteNewsService.execute(news.id);

        const found = await newsRepositoryInMemory.getNewsById(news.id);
        expect(found).toBeFalsy();
    });

    it('Should throw NotFoundException if news does not exist', async () => {
        await expect(deleteNewsService.execute(999)).rejects.toThrow(NotFoundException);
    });
});
