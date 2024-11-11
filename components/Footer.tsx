"use client";

import { LogoMario } from "@/app/SVGFiles";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-xs pt-10 pb-10">
      <Link href="https://marioponte.vercel.app/" target="_blank" className="flex gap-1 items-center transition duration-75 text-neutral-600 hover:text-black dark:text-neutral-200 dark:hover:text-white w-fit m-auto group">
        <LogoMario className='h-6 fill-neutral-600 group-hover:fill-black dark:fill-neutral-200 group-hover:dark:fill-white' />
        <span>Developed by Mário Ponte</span>
      </Link>
    </footer>
  );
}