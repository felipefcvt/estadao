import { Injectable, NotFoundException } from "@nestjs/common";
import { NewsRepository } from "../repositories/NewsRepository";

@Injectable()
export class DeleteNewsService {
    constructor(private newsRepository: NewsRepository) {}

    async execute(id: number): Promise<void> {
        const existing = await this.newsRepository.getNewsById(id);

        if (!existing) {
            throw new NotFoundException(`News with id ${id} not found`);
        }

        await this.newsRepository.delete(id);
    }
}