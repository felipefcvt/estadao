import {NewsRepositoryInMemory} from "../repositories/NewsRepositoryInMemory";
import {ListAllNewsService} from "./listAllNews.service";
import {News} from "../entities/News";

let newsRepositoryInMemory: NewsRepositoryInMemory;
let listAllNewsService: ListAllNewsService;

describe('List all news', () => {
    beforeEach(() => {
        newsRepositoryInMemory = new NewsRepositoryInMemory();
        listAllNewsService = new ListAllNewsService(newsRepositoryInMemory);
    })

    it('Should return an empty array if no news exists', async () => {
        const news = await listAllNewsService.execute()
        expect(news).toEqual([])
    })

    it('Should be able to list all news', async () => {
        const news1 = new News({
            chapeu: 'Cultura',
            url: 'https://cultura.com',
            titulo: 'Exposição de arte',
            dataHoraPublicacao: new Date(),
            imagem: 'https://img.com/img1.jpg',
            thumbnail: 'https://img.com/thumb1.jpg',
            conteudo: 'Uma nova exposição foi aberta em Brasília.',
        });

        const news2 = new News({
            chapeu: 'Tecnologia',
            url: 'https://tech.com',
            titulo: 'Nova IA é lançada',
            dataHoraPublicacao: new Date(),
            imagem: 'https://img.com/img2.jpg',
            thumbnail: 'https://img.com/thumb2.jpg',
            conteudo: 'A nova IA promete revolucionar o mercado.',
        });

        await newsRepositoryInMemory.create(news1);
        await newsRepositoryInMemory.create(news2);

        const allNews = await listAllNewsService.execute();

        expect(allNews.length).toBe(2);
        expect(allNews).toContainEqual(news1);
        expect(allNews).toContainEqual(news2);
    })
})

