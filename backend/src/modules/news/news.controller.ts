import {
    Controller,
    Post,
    Body,
    Put,
    Delete,
    Get,
    Param
} from "@nestjs/common";
import {
    ApiTags,
    ApiOperation,
    ApiResponse, ApiParam,
} from "@nestjs/swagger";
import {CreateNewsService} from "./services/createNews.service";
import {CreateNewsBody} from "./dto/createNewsDTO";
import {NewsViewModel} from "./viewModel/newsViewModel";
import {ListAllNewsService} from "./services/listAllNews.service";
import {GetNewsByIdService} from "./services/getNewsById.service"
import { UpdateNewsService } from "./services/updateNews.service";
import { DeleteNewsService } from "./services/deleteNews.service";
import {UpdateNewsBody} from "./dto/updateNewsDTO";

@ApiTags('News')
@Controller('news')
export class NewsController {
    constructor(
        private createNewsService: CreateNewsService,
        private listAllNewsService: ListAllNewsService,
        private getNewsByIdService: GetNewsByIdService,
        private updateNewsService: UpdateNewsService,
        private deleteNewsService: DeleteNewsService,
    ) {}

    @Post()
    @ApiOperation({ summary: "Create news" })
    @ApiResponse({ status: 201, description: "News successfully created" })
    @ApiResponse({ status: 400, description: "Validation error" })
    async create(@Body() body: CreateNewsBody ) {
        const { chapeu, url, titulo, dataHoraPublicacao, imagem, thumbnail, conteudo } = body;

        const news = await this.createNewsService.execute({
            chapeu,
            url,
            titulo,
            dataHoraPublicacao,
            imagem,
            thumbnail,
            conteudo,
        })

        return NewsViewModel.toHttp(news);
    }

    @Get('list-all-news')
    @ApiOperation({ summary: "Retrieve all news" })
    @ApiResponse({ status: 200, description: "News list successfully retrieved" })
    async listAll() {
        const news = await this.listAllNewsService.execute();
        return news.map(NewsViewModel.toHttp);
    }

    @Get(':id')
    @ApiOperation({ summary: "Find a news by ID" })
    @ApiParam({ name: "id", required: true, description: "News ID" })
    @ApiResponse({ status: 200, description: "News successfully found" })
    @ApiResponse({ status: 404, description: "News not found" })
    async getById(@Param('id') id: string) {
        const news = await this.getNewsByIdService.execute(Number(id));
        return NewsViewModel.toHttp(news);
    }

    @Put(':id')
    @ApiOperation({ summary: "Update a news by ID" })
    @ApiResponse({ status: 200, description: "News successfully updated" })
    @ApiResponse({ status: 404, description: "News not found" })
    async update(
        @Param('id') id: string,
        @Body() body: UpdateNewsBody
    ) {
        const news = await this.updateNewsService.execute(Number(id), body);
        return NewsViewModel.toHttp(news);
    }

    @Delete(':id')
    @ApiOperation({ summary: "Delete a news by ID" })
    @ApiResponse({ status: 204, description: "News successfully deleted" })
    @ApiResponse({ status: 404, description: "News not found" })
    async delete(@Param('id') id: string) {
        await this.deleteNewsService.execute(Number(id));
    }
}