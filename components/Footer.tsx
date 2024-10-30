"use client";

import Link from "next/link";

export default function Footer() {
  return (
      <div className="text-xs text-center pt-10 pb-10">
        <Link href="https://marioponte.vercel.app/" target="_blank">
        Developed by Mário Ponte
        </Link>
        
      </div>
  );
}