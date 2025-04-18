import { z } from 'zod';
import { ApiPropertyOptional } from '@nestjs/swagger';

export const updateNewsSchema = z.object({
    chapeu: z.string().min(1, 'Chapéu é obrigatório').optional(),
    url: z.string().url('URL inválida').optional(),
    titulo: z.string().min(3, 'Título deve ter ao menos 3 caracteres').optional(),
    dataHoraPublicacao: z.coerce.date().optional(),
    imagem: z.string().url('URL da imagem inválida').optional(),
    thumbnail: z.string().url('URL da thumbnail inválida').optional(),
    conteudo: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres').optional(),
});

export class UpdateNewsBody {
    @ApiPropertyOptional({ example: 'Economia' })
    chapeu?: string;

    @ApiPropertyOptional({ example: 'https://site.com/noticia' })
    url?: string;

    @ApiPropertyOptional({ example: 'Mercado financeiro reage positivamente' })
    titulo?: string;

    @ApiPropertyOptional({ example: '2025-04-16T14:00:00.000Z' })
    dataHoraPublicacao?: Date;

    @ApiPropertyOptional({ example: 'https://cdn.site.com/imagens/noticia.jpg' })
    imagem?: string;

    @ApiPropertyOptional({ example: 'https://cdn.site.com/imagens/thumb-noticia.jpg' })
    thumbnail?: string;

    @ApiPropertyOptional({ example: 'O Ibovespa fechou em alta...' })
    conteudo?: string;
}
