'use client';

import { ThemeProvider } from "next-themes";

const Providers = ({ children }: any) => {
    return (
        <>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </>
    )
}

export default Providers;