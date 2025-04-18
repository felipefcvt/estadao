'use client';

import { UseFormRegister } from 'react-hook-form';

interface Props {
    register: UseFormRegister<any>;
}

export default function NewsFormFields({ register }: Props) {
    return (
        <>
            <label htmlFor="chapeu" className="sr-only">Chapéu</label>
            <input
                id="chapeu"
                {...register('chapeu', { required: true })}
                className="w-full border p-2"
                placeholder="Chapéu"
                title="Informe o chapéu da notícia"
                required
            />

            <label htmlFor="url" className="sr-only">URL</label>
            <input
                id="url"
                {...register('url', { required: true })}
                className="w-full border p-2"
                placeholder="URL"
                title="Informe a URL da notícia"
                required
            />

            <label htmlFor="titulo" className="sr-only">Título</label>
            <input
                id="titulo"
                {...register('titulo', { required: true })}
                className="w-full border p-2"
                placeholder="Título"
                title="Informe o título da notícia"
                required
            />

            <label htmlFor="imagem" className="sr-only">Imagem</label>
            <input
                id="imagem"
                {...register('imagem', { required: true })}
                className="w-full border p-2"
                placeholder="Imagem"
                title="Informe o link da imagem principal"
                required
            />

            <label htmlFor="thumbnail" className="sr-only">Thumbnail</label>
            <input
                id="thumbnail"
                {...register('thumbnail', { required: true })}
                className="w-full border p-2"
                placeholder="Thumbnail"
                title="Informe a imagem de destaque (thumbnail)"
                required
            />

            <label htmlFor="conteudo" className="sr-only">Conteúdo</label>
            <textarea
                id="conteudo"
                {...register('conteudo', { required: true })}
                className="w-full border p-2"
                placeholder="Conteúdo"
                title="Informe o conteúdo completo da notícia"
                rows={4}
                required
            />
        </>
    );
}
