'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    const isAdmin = pathname.startsWith('/admin');

    return (
        <header
            className="fixed top-0 w-full z-50 h-[60px] px-4 flex items-center"
            style={{ backgroundColor: 'rgb(0, 36, 185)' }}
        >
            <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
                <Link href="/admin/news" className="text-white hover:opacity-80">
                    <Menu size={28} />
                </Link>

                <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 block lg:hidden">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={120}
                        height={40}
                        className="brightness-0 invert"
                    />
                </Link>

                <div className="flex items-center gap-4">
                    {isAdmin ? (
                        <span className="text-white font-medium font-bold text-md">Olá, Admin</span>
                    ) : (
                        <>
                            <Link
                                href="https://ofertas.estadao.com.br/?sub-canal=botao&posicao=menu-superior&referrer_url=https://www.estadao.com.br/"
                                target="_blank"
                                className="hidden lg:block bg-yellow-400 text-black font-semibold px-4 py-1.5 rounded hover:bg-yellow-300 transition text-sm"
                            >
                                ASSINE ESTADÃO
                            </Link>
                            <Link
                                href="/admin/news"
                                className="text-white flex items-center gap-1 hover:opacity-80"
                            >
                                Entrar
                                <User size={20} />
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </header>
    );
}
