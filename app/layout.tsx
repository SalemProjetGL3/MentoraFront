"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LoadingProvider } from "@/components/ui/loading-provider"
import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingCube from "@/components/ui/loading-cube";

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set loading to true when pathname or searchParams change (indicating navigation)
    setIsLoading(true);

    // Set loading to false after a short delay to simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Adjust the delay as needed (e.g., 300ms)

    // Clean up the timer on effect cleanup or when dependencies change
    return () => clearTimeout(timer);
  }, [pathname, searchParams]); // Re-run effect when pathname or searchParams change

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className={`${inter.className} bg-background min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* <LoadingProvider> */}
            {children}
            {isLoading && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <LoadingCube />
              </div>
            )}
          {/* </LoadingProvider> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
