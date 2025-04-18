'use client';

import { useNews } from '@/context/NewsContext';
import { useEffect, useState } from 'react';
import EditNewsModal from '@/components/EditNewsModal';
import { News } from '@/context/NewsContext';
import CreateNewsButton from "@/components/CreateNewsButton";

export default function AdminNewsPage() {
    const { news, fetchNews, removeNews, editNews } = useNews();
    const [loading, setLoading] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);

    const handleDelete = async (id: number) => {
        setLoading(true);
        try {
            await removeNews(id);
        } catch (err) {
            console.error('Erro ao deletar notícia:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (data: any) => {
        if (!editingNews) return;
        await editNews(editingNews.id, data);
        setEditingNews(null);
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Notícias</h1>
                <CreateNewsButton />
            </div>

            {news.length === 0 ? (
                <p className="text-gray-500">Nenhuma notícia cadastrada ainda.</p>
            ) : (
                <div className="overflow-auto">
                    <table className="min-w-[768px] w-full border-collapse border">
                        <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border p-2">Título</th>
                            <th className="border p-2">Publicação</th>
                            <th className="border p-2 text-center">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {news.map((_news) => (
                            <tr key={_news.id} className="hover:bg-gray-50">
                                <td className="border p-2">{_news.titulo}</td>
                                <td className="border p-2 text-sm text-gray-600">
                                    {new Date(_news.dataHoraPublicacao).toLocaleString('pt-BR')}
                                </td>
                                <td className="border p-2 text-center flex gap-2 justify-center">
                                    <button
                                        onClick={() => setEditingNews(_news)}
                                        className="px-3 py-1 text-sm border-blue-400 border text-blue-400 rounded hover:bg-blue-400 hover:text-white"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(_news.id)}
                                        className="px-3 py-1 text-sm border-red-500 border text-red-500 rounded hover:bg-red-600 hover:text-white disabled:bg-gray-400"
                                        disabled={loading}
                                    >
                                        {loading ? '...' : 'Excluir'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editingNews && (
                <EditNewsModal
                    news={editingNews}
                    onClose={() => setEditingNews(null)}
                    onSubmit={handleUpdate}
                />
            )}
        </div>
    );
}
