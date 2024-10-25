"use client";

import Image from "next/image";
import { ThemeButton } from "./ThemeButton";
import Link from "next/link";

export default function Navbar() {
    return (
        <div>
            <div className="border-b py-2 px-2">
                <div className="flex gap-1 items-center justify-between">
                    <div className="flex gap-1">
                        <Image width={100} height={100} className="h-5 w-5" alt="ucl icon" src="/images/uclLogo.svg" />
                        <span className="text-sm font-light">Champions League Draw Simulator</span>
                    </div>
                    <div>
                        <ThemeButton />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 border-b py-2 px-2 text-sm">
                <Link href="/">Champions League 24/25</Link>
                <Link href="/uel-24-25">Europa League 24/25</Link>
            </div>
        </div>
    );
}
