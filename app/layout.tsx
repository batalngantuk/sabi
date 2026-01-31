import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
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
  title: "sabi - Niat Baik, Gas Aksi!",
  description: "AI-powered suggestions, gamifikasi, dan social proof untuk membantu kamu berbuat kebaikan setiap hari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--white)',
              color: 'var(--text-primary)',
              border: '1px solid var(--primary-orange)',
              borderRadius: '12px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: 'var(--primary-orange)',
                secondary: 'var(--white)',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
