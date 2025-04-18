'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
    getAllNews,
    createNews,
    updateNews,
    deleteNews,
    getNewsById
} from '@/services/news';
import toast from 'react-hot-toast';

export interface News {
    dataHoraPublicacao: string;
    id: number;
    chapeu: string;
    titulo: string;
    url: string;
    conteudo: string;
    imagem: string;
    thumbnail: string;
    updatedAt: string;
}

interface NewsContextType {
    news: News[];
    fetchNews: () => void;
    addNews: (data: any) => Promise<void>;
    editNews: (id: number, data: any) => Promise<void>;
    removeNews: (id: number) => Promise<void>;
    getNewsById: (id: number) => Promise<News>;
}

const NewsContext = createContext({} as NewsContextType);

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
    const [news, setNews] = useState<News[]>([]);

    const fetchNews = async () => {
        try {
            const res = await getAllNews();
            setNews(res.data);
        } catch (err) {
            toast.error('Erro ao buscar as notícias');
        }
    };

    const addNews = async (data: any) => {
        try {
            await createNews(data);
            toast.success('Notícia criada com sucesso!');
            await fetchNews();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Erro ao criar notícia');
        }
    };

    const editNews = async (id: number, data: any) => {
        try {
            await updateNews(id, data);
            toast.success('Notícia atualizada!');
            await fetchNews();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Erro ao atualizar notícia');
        }
    };

    const removeNews = async (id: number) => {
        try {
            await deleteNews(id);
            toast.success('Notícia excluída');
            await fetchNews();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Erro ao excluir notícia');
        }
    };

    const getNewsByIdAsync = async (id: number) => {
        const res = await getNewsById(id);
        return res.data;
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <NewsContext.Provider value={{ news, fetchNews, addNews, editNews, removeNews, getNewsById: getNewsByIdAsync }}>
            {children}
        </NewsContext.Provider>
    );
};

export const useNews = () => useContext(NewsContext);
