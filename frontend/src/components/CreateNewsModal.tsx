'use client';

import { useForm } from 'react-hook-form';
import NewsFormFields from "@/components/NewsFormFields";

interface Props {
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export default function CreateNewsModal({ onClose, onSubmit }: Props) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            chapeu: '',
            url: '',
            titulo: '',
            imagem: '',
            thumbnail: '',
            conteudo: '',
        },
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 sm:p-6 rounded shadow-md w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Criar Nova Notícia</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <NewsFormFields register={register} />

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" title="Cancelar" onClick={handleClose} className="px-4 py-2 bg-gray-400 text-white rounded">
                            Cancelar
                        </button>
                        <button type="submit" title="Criar" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
