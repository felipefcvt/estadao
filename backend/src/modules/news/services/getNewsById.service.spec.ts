import {NewsRepositoryInMemory} from "../repositories/NewsRepositoryInMemory";
import {GetNewsByIdService} from "./getNewsById.service";
import {News} from "../entities/News";
import {number} from "zod";

let newsRepositoryInMemory: NewsRepositoryInMemory;
let getNewsByIdService: GetNewsByIdService;

describe('Get news by ID', () => {
    beforeEach(async () => {
        newsRepositoryInMemory = new NewsRepositoryInMemory()
        getNewsByIdService = new GetNewsByIdService(newsRepositoryInMemory)
    })

    it('Should return a news by ID', async () => {
        const news = new News({
            chapeu: 'Economia',
            url: 'https://economia.com/news',
            titulo: 'Mercado em alta',
            dataHoraPublicacao: new Date(),
            imagem: 'https://economia.com/news.jpg',
            thumbnail: 'https://economia.com/thumb.jpg',
            conteudo: 'O mercado de ações registrou alta hoje...'
        });

        await newsRepositoryInMemory.create(news);

        const result = await getNewsByIdService.execute(news.id);

        expect(result).toBeDefined();
        expect(result.id).toBe(news.id);
        expect(result.titulo).toBe('Mercado em alta');
    });

    it('Should throw an error if news ID does not exist', async () => {
        await expect(
            getNewsByIdService.execute(999)
        ).rejects.toThrowError('Could not find news by 999');
    })

})