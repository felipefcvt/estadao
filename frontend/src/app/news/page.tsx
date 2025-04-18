'use client';

import Link from 'next/link';
import { useNews } from '@/context/NewsContext';
import Image from 'next/image';

export default function NewsListPage() {
    const { news } = useNews();

    const isLoading = news.length === 0;

    return (
        <div className="p-2 max-w-7xl mx-auto">
            {isLoading ? (
                <div className="text-center text-gray-500 text-lg py-10">
                    Carregando notícias...
                </div>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {news.map((_news) => (
                        <Link key={_news.id} href={`/news/${_news.id}`} className={`group block`}>
                            <div className="overflow-hidden transition duration-300 bg-white flex flex-col h-full">
                                <div className="relative w-full h-56">
                                    <Image
                                        src={_news.thumbnail}
                                        alt={_news.titulo}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <div className="py-2 flex flex-col gap-1 flex-grow">
                                    <span className="text-sm text-blue-400 uppercase tracking-wide">
                                        {_news.chapeu}
                                    </span>
                                    <h2 className="text-xl font-serif font-semibold text-gray-800 transition line-clamp-2">
                                        {_news.titulo}
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-auto">
                                        {new Date(_news.dataHoraPublicacao).toLocaleDateString('pt-BR')} |{' '}
                                        {new Date(_news.dataHoraPublicacao).toLocaleTimeString('pt-BR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
