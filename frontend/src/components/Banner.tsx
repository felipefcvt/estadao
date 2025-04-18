'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Banner() {
    return (
        <div
            className="hidden lg:flex w-full h-[100px] items-center justify-center"
            style={{ backgroundColor: 'rgb(0, 47, 216)' }}
        >
            <Link href="/" className="block">
                <Image
                    src="/logo.png"
                    alt="Banner"
                    width={300}
                    height={300}
                    className="brightness-0 invert"
                    priority
                />
            </Link>
        </div>

    );
}
