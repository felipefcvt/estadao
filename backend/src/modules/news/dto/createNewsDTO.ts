import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const createNewsSchema = z.object({
    chapeu: z.string().min(1, 'Chapéu é obrigatório'),
    url: z.string().url('URL inválida'),
    titulo: z.string().min(3, 'Título deve ter ao menos 3 caracteres'),
    dataHoraPublicacao: z.coerce.date().optional(),
    imagem: z.string().url('URL da imagem inválida'),
    thumbnail: z.string().url('URL da thumbnail inválida'),
    conteudo: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),
});

export class CreateNewsBody {
    @ApiProperty({ example: 'Política' })
    chapeu: string;

    @ApiProperty({ example: 'https://minhanoticia.com/politica/novo-pl' })
    url: string;

    @ApiProperty({ example: 'Novo projeto de lei é aprovado' })
    titulo: string;

    @ApiProperty({ example: '2025-04-16T14:00:00.000Z' })
    dataHoraPublicacao: Date;

    @ApiProperty({ example: 'https://cdn.site.com/imagens/noticia.jpg' })
    imagem: string;

    @ApiProperty({ example: 'https://cdn.site.com/imagens/thumb-noticia.jpg' })
    thumbnail: string;

    @ApiProperty({ example: 'O novo projeto de lei que trata sobre...' })
    conteudo: string;
}
