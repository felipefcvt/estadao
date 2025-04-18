'use client';

import { useNews } from '@/context/NewsContext';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function NewsDetailPage() {
    const { id } = useParams();
    const { getNewsById } = useNews();
    const [news, setNews] = useState<any>(null);

    useEffect(() => {
        if (id) {
            getNewsById(Number(id)).then(setNews);
        }
    }, [id]);

    if (!news) return <p>Carregando...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">{news.titulo}</h1>
            <p className="text-gray-500">{new Date(news.dataHoraPublicacao).toLocaleString()}</p>
            <img src={news.imagem} alt="" className="my-4 rounded" />
            <div dangerouslySetInnerHTML={{ __html: news.conteudo }} />
        </div>
    );
}
