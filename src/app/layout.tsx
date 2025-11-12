import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/Navigation';
import { QueryProvider } from '@/components/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'AMA Career Platform',
  description: 'Discover your ideal career path through AI-powered voice assessment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <QueryProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main>{children}</main>
            <Toaster position="top-right" />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
