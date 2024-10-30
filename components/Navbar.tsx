"use client";

import Image from "next/image";
import { ThemeButton } from "./ThemeButton";
import Link from "next/link";

export default function Navbar() {
    return (
        <div>
            <div className="border-b py-2 px-2">
                <div className="flex gap-1 items-center justify-between">
                    <div className="flex gap-1 items-center">
                        <Image src="/images/logo.svg" alt="logo" width={100} height={100} className="w-8 h-8" />
                        <span className="text-sm font-light">DICEDRAW</span>
                    </div>
                    <div>
                        <ThemeButton />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 border-b py-2 px-2 text-sm">
                <Link href="/ucl/2024-2025">Champions League</Link>
                <Link href="/uel/2024-2025">Europa League</Link>
            </div>
        </div>
    );
}
