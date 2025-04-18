import {Injectable, NotFoundException} from "@nestjs/common";
import {NewsRepository} from "../repositories/NewsRepository";

@Injectable()
export class GetNewsByIdService {
    constructor(private newsRepository: NewsRepository) {}

    async execute(id: number): Promise<any> {
        const news = await this.newsRepository.getNewsById(id)

        if (!news) {
            throw new NotFoundException(`Could not find news by ${id}`);
        }

        return news;
    }
}