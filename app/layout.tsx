import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Champions League Draw Simulator",
  description: "Champions League Draw Simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="border-b py-2 px-2">
          <div className="flex gap-1 items-center">
            <Image width={100} height={100} className="h-5 w-5" alt="ucl icon" src="/images/uclLogo.svg" />
            <span className="text-sm font-light">Champions League Draw Simulator</span>
          </div>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
