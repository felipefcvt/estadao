'use client';

import { useState } from 'react';
import { useNews } from '@/context/NewsContext';
import CreateNewsModal from './CreateNewsModal';

export default function CreateNewsButton() {
    const { addNews } = useNews();
    const [open, setOpen] = useState(false);

    const handleCreate = async (data: any) => {
        await addNews(data);
        setOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                title="Criar nova notícia"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                + Nova Notícia
            </button>

            {open && (
                <CreateNewsModal
                    onClose={() => setOpen(false)}
                    onSubmit={handleCreate}
                />
            )}
        </>
    );
}
