import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {NewsRepository} from "../../modules/news/repositories/NewsRepository";
import {PrismaNewsRepository} from "./prisma/repositories/PrismaNewsRepository";

@Module({
    providers: [
        PrismaService,
        {
            provide: NewsRepository,
            useClass: PrismaNewsRepository,
        }
    ],
    exports: [NewsRepository, PrismaService],
})
export class DatabaseModule {}