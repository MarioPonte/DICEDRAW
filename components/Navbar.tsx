"use client";

import Image from "next/image";
import { ThemeButton } from "./ThemeButton";
import Link from "next/link";
import { LogoGitHub } from "@/app/SVGFiles";

export default function Navbar() {
    return (
        <nav>
            <div className="border-b py-2 px-2">
                <div className="flex gap-1 items-center justify-between">
                    <div className="flex gap-1 items-center">
                        <Image src="/images/logo.svg" alt="logo" width={100} height={100} className="w-8 h-8" />
                        <span className="text-sm font-light">DICEDRAW</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="https://github.com/MarioPonte/ucldrawsimulator" target="_blank">
                        <LogoGitHub className='h-6 fill-neutral-400 hover:fill-neutral-600 transition duration-75 dark:fill-neutral-200 hover:dark:fill-white' />
                        </Link>
                        <ThemeButton />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 border-b py-2 px-2 text-sm">
                <Link href="/ucl/2025-2026">Champions League</Link>
                <Link href="/uel/2025-2026">Europa League</Link>
                <Link href="/fcwc/2025">FIFA Club World Cup</Link>
            </div>
        </nav>
    );
}
