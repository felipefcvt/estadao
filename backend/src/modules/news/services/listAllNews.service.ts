import {NewsRepository} from "../repositories/NewsRepository";
import {Injectable} from "@nestjs/common";
import {News} from "../entities/News";

@Injectable()
export class ListAllNewsService {
    constructor(private newsRepository: NewsRepository) {}

    async execute(): Promise<News[]> {
        const news = await this.newsRepository.listAllNews()
        return news;
    }
}