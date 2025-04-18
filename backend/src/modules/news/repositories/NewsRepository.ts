import {News} from "../entities/News";

export abstract class NewsRepository {
    abstract create(news: News): Promise<News>;

    abstract listAllNews(): Promise<News[]>;

    abstract getNewsById(id: number): Promise<News>;

    abstract update(id: number, news: News): Promise<News>;

    abstract delete(id: number): Promise<void>;
}