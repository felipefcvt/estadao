import {Injectable} from "@nestjs/common";
import {NewsRepository} from "../../../../modules/news/repositories/NewsRepository";
import {News} from "../../../../modules/news/entities/News";
import {PrismaNewsMappers} from "../mappers/PrismaNewsMappers";
import {PrismaService} from "../prisma.service";

@Injectable()
export class PrismaNewsRepository implements NewsRepository {
    constructor(private prisma: PrismaService) {}

    async create(news: News): Promise<any> {
        const newRaw = PrismaNewsMappers.toPrisma(news);

        return await this.prisma.news.create({
            data: newRaw,
        });
    }

    async listAllNews(): Promise<News[]> {
        const news = await this.prisma.news.findMany()
        // @ts-ignore
        return news;
    }

    async getNewsById(id: number): Promise<any> {
        return await this.prisma.news.findUnique({
            where: { id },
        });
    }

    async update(id: number, news: News): Promise<any> {
        const raw = PrismaNewsMappers.toPrisma(news);

        return await this.prisma.news.update({
            where: { id },
            data: raw,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.news.delete({
            where: { id },
        });
    }
}