"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // Create a new instance of QueryClient

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // className="bg-white dark:bg-neutral-950"
      style={{ scrollBehavior: "smooth", overscrollBehavior: "none" }}
    >
      <head>
        <title>INNOBYTEX - Creating Digital Experiences That Matter</title>
        <meta
          name="description"
          content="A forward-thinking team of designers and developers creating innovative solutions that help businesses grow and succeed in the digital landscape."
        />

        {/* Favicon and Icons */}
        <link rel="icon" href="/images/icon.png" />
        <link rel="shortcut icon" href="/images/icon.png" />
        <link rel="apple-touch-icon" href="/images/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/icon.png"
        />

        {/* Theme Colors */}
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#020617"
          media="(prefers-color-scheme: dark)"
        />

        {/* Viewport and Color Scheme */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
        />
        <meta name="color-scheme" content="light dark" />

        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="INNOBYTEX - Creating Digital Experiences That Matter"
        />
        <meta
          property="og:description"
          content="A forward-thinking team of designers and developers creating innovative solutions that help businesses grow and succeed in the digital landscape."
        />
        <meta property="og:image" content="/images/icon.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="INNOBYTEX - Creating Digital Experiences That Matter"
        />
        <meta
          name="twitter:description"
          content="A forward-thinking team of designers and developers creating innovative solutions that help businesses grow and succeed in the digital landscape."
        />
        <meta name="twitter:image" content="/images/icon.png" />
      </head>
      <body
        className="bg-white dark:bg-neutral-950 text-foreground antialiased"
        style={{ overscrollBehavior: "none" }}
      >
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
