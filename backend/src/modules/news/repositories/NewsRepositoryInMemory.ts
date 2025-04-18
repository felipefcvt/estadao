import {NewsRepository} from "./NewsRepository";
import {News} from "../entities/News";

export class NewsRepositoryInMemory implements NewsRepository {
    private news: News[] = [];
    private idCounter = 1;

    async create(news: News): Promise<News> {
        (news as any)._id = this.idCounter++;
        this.news.push(news);
        return news;
    }

    async listAllNews(): Promise<News[]> {
        return this.news;
    }

    async getNewsById(id: number): Promise<any> {
        return this.news.find((news) => news.id === id) ?? null;
    }

    async update(id: number, updatedNews: News): Promise<News> {
        const index = this.news.findIndex((news) => news.id === id);
        if (index === -1) throw new Error('News not found');

        (updatedNews as any)._id = id;
        this.news[index] = updatedNews;

        return updatedNews;
    }

    async delete(id: number): Promise<void> {
        const index = this.news.findIndex((news) => news.id === id);
        if (index === -1) throw new Error('News not found');

        this.news.splice(index, 1);
    }
}
