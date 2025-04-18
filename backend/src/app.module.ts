import { Module } from '@nestjs/common';
import {DatabaseModule} from "./infra/database/database.module";
import {NewsModule} from "./modules/news/news.module";

@Module({
  imports: [DatabaseModule, NewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
