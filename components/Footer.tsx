"use client";

import { LogoMario } from "@/app/SVGFiles";
import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="text-xs pt-10">
      <Container>
        <div className="flex flex-col gap-4">
          <Link href="https://marioponte.vercel.app/" target="_blank" className="flex gap-1 items-center transition duration-75 text-neutral-600 hover:text-black dark:text-neutral-200 dark:hover:text-white w-fit m-auto group">
            <LogoMario className='h-6 fill-neutral-600 group-hover:fill-black dark:fill-neutral-200 group-hover:dark:fill-white' />
            <span>Developed by Mário Ponte</span>
          </Link>
          <hr />
          <span className="text-neutral-400">
            Atenção, os sorteios simulados no DICEDRAW não representam os sorteios oficiais e as regras implementadas podem divergir
            das regras oficiais das respetivas entidades organizadoras. Este é um projeto independente e não possui qualquer
            ligação com as organizações mencionadas.
          </span>
        </div>
      </Container>
    </footer>
  );
}