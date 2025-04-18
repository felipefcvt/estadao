import { NewsRepositoryInMemory } from '../repositories/NewsRepositoryInMemory';
import { CreateNewsService } from './createNews.service';
import { BadRequestException } from '@nestjs/common';

let newsRepositoryInMemory: NewsRepositoryInMemory;
let createNewsService: CreateNewsService;

describe('Create News', () => {
    beforeEach(() => {
        newsRepositoryInMemory = new NewsRepositoryInMemory();
        createNewsService = new CreateNewsService(newsRepositoryInMemory);
    });

    it('Should be able to create a new news', async () => {
        const news = await createNewsService.execute({
            chapeu: 'Política',
            url: 'https://exemplo.com',
            titulo: 'Título da notícia',
            dataHoraPublicacao: '2025-04-16T01:17:04.067Z',
            imagem: 'https://exemplo.com/imagem.jpg',
            thumbnail: 'https://exemplo.com/thumb.jpg',
            conteudo: 'Este é um conteúdo válido da notícia.',
        });

        const all = await newsRepositoryInMemory.listAllNews();
        expect(all.length).toBe(1);
        expect(all[0]).toBeInstanceOf(Object);
    });

    it('Should not create news with missing fields', async () => {
        await expect(
            createNewsService.execute({
                chapeu: '',
                url: '',
                titulo: '',
                dataHoraPublicacao: '',
                imagem: '',
                thumbnail: '',
                conteudo: '',
            }),
        ).rejects.toThrow(BadRequestException);
    });

    it('Should not create news with invalid URL', async () => {
        await expect(
            createNewsService.execute({
                chapeu: 'Tech',
                url: 'url inválida',
                titulo: 'Notícia legal',
                dataHoraPublicacao: '2025-04-16T01:17:04.067Z',
                imagem: 'url inválida',
                thumbnail: 'url inválida',
                conteudo: 'Conteúdo válido demais!',
            }),
        ).rejects.toThrow(BadRequestException);
    });

    it('Should apply Brasília timezone when creating', async () => {
        const now = new Date();
        const expectedHourInBrasilia = new Date(now.setHours(now.getHours() - 3)).getHours();

        const result = await createNewsService.execute({
            chapeu: 'Cultura',
            url: 'https://cultura.com',
            titulo: 'Nova exposição',
            dataHoraPublicacao: new Date().toISOString(),
            imagem: 'https://cultura.com/img.jpg',
            thumbnail: 'https://cultura.com/thumb.jpg',
            conteudo: 'Uma exposição incrível está acontecendo em Brasília.',
        });

        expect(result).toBeDefined();
        expect(result.dataHoraPublicacao.getHours()).toBe(expectedHourInBrasilia);
    });
});
