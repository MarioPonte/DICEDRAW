import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const championsFont = localFont({
  src: [
    {
      path: "../public/fonts/Champions-Bold.ttf",
    },
  ],
  variable: "--font-champions",
});

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
      <body className={`${championsFont.variable} text-white bg-[#010056]`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
