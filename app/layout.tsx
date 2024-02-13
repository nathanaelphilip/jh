import './globals.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jack Henry YouTube Search',
  description: 'Search for YouTube videos.',
};

export default function RootLayout({
  children,
  results,
}: Readonly<{
  children: React.ReactNode;
  results: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen grid grid-cols-12 p-8 gap-8">
          <div className="col-span-3">{children}</div>
          <div className="col-span-9">{results}</div>
        </main>
      </body>
    </html>
  );
}
