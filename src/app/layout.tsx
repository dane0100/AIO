import './globals.css';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Showcasing my work',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}