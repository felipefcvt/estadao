import { Module } from '@nestjs/common';
import {DatabaseModule} from "../../infra/database/database.module";
import {NewsController} from "./news.controller";
import {CreateNewsService} from "./services/createNews.service";
import {ListAllNewsService} from "./services/listAllNews.service";
import {DeleteNewsService} from "./services/deleteNews.service";
import {UpdateNewsService} from "./services/updateNews.service";
import {GetNewsByIdService} from "./services/getNewsById.service";

@Module({
    imports: [DatabaseModule],
    controllers: [NewsController],
    providers: [CreateNewsService, ListAllNewsService, GetNewsByIdService, UpdateNewsService, DeleteNewsService],
})
export class NewsModule {}