import AuthGuard from "@/src/components/auth-guard";
import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import QueryProvider from "@/src/lib/query-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BigsBoard",
  description: "게시판 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="ko">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header />
          <AuthGuard>
            <main className="container mx-auto px-4 py-8 sm:min-h-[calc(100vh-9.3rem)] min-h-[calc(100vh-7rem)] mt-8 sm:mt-16 ">
              {children}
            </main>
            <Footer />
          </AuthGuard>
        </body>
      </html>
    </QueryProvider>
  );
}
