<<<<<<< HEAD
import { Inter } from 'next/font/google';
=======
import { Metadata } from 'next';
import * as React from 'react';
>>>>>>> temp-branch

import { Providers } from '@/components/Providers';

<<<<<<< HEAD
import './globals.css';
=======
import { siteConfig } from '@/constant/config';
import { AuthProvider } from '@/contexts/AuthContext';
>>>>>>> temp-branch

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fergeh Quiz App',
  description: 'A modern quiz application for students',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
<<<<<<< HEAD
      <body className={inter.className}>
        <Providers>{children}</Providers>
=======
      <body>
        <AuthProvider>{children}</AuthProvider>
>>>>>>> temp-branch
      </body>
    </html>
  );
}
